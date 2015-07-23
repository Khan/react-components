/**
 * For math rendered using KaTex and/or MathJax. Use me like <TeX>2x + 3</TeX>.
 */
// TODO(joel) - require MathJax / katex so they don't have to be global

var React = require('react');

var katexA11y = require('./katex-a11y.js');

var pendingScripts = [];
var needsProcess = false;
var timeout = null;

function process(script, callback) {
    pendingScripts.push(script);
    if (!needsProcess) {
        needsProcess = true;
        timeout = setTimeout(doProcess, 0, callback);
    }
}

function doProcess(callback) {
    MathJax.Hub.Queue(function() {
        var oldElementScripts = MathJax.Hub.elementScripts;
        MathJax.Hub.elementScripts = function(element) {
            var scripts = pendingScripts;
            pendingScripts = [];
            needsProcess = false;
            return scripts;
        };

        try {
            return MathJax.Hub.Process(null, callback);
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            MathJax.Hub.elementScripts = oldElementScripts;
        }
    });
}

// Make content only visible to screen readers.
// Both collegeboard.org and Bootstrap 3 use this exact implementation.
var srOnly = {
    border: 0,
    clip: "rect(0,0,0,0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px"
};

var TeX = React.createClass({
    getDefaultProps: function() {
        return {
            // Called after math is rendered or re-rendered
            onRender: function() {},
            onClick: null
        };
    },

    render: function() {
        return <span
                style={this.props.style}
                onClick={this.props.onClick}>
            <span ref="mathjax" />
            <span ref="katex" />
            <span ref="katexA11y" style={srOnly} />
        </span>;
    },

    componentDidMount: function() {
        var text = this.props.children;
        var onRender = this.props.onRender;
        var katexHolder = this.refs.katex.getDOMNode();

        katexHolder.removeAttribute("aria-hidden");

        try {
            katex.render(text, katexHolder);

            try {
                var katexA11yHolder = this.refs.katexA11y.getDOMNode();
                katexA11y.render(text, katexA11yHolder);

                katexHolder.setAttribute("aria-hidden", "true");
            } catch(e) {
                // NOTE: If an exception is thrown from the katex-a11y logic
                // then we assume that it doesn't know how to render the result
                // thus we remove any a11y text and don't show it to the user.
                this.emptyNode(katexA11yHolder);
            }

            onRender();
            return;
        } catch (e) {
            /* jshint -W103 */
            if (e.__proto__ !== katex.ParseError.prototype) {
            /* jshint +W103 */
                throw e;
            }
        }

        this.setScriptText(text);
        process(this.script, onRender);
    },

    componentDidUpdate: function(prevProps, prevState) {
        var oldText = prevProps.children;
        var newText = this.props.children;
        var onRender = this.props.onRender;

        if (oldText !== newText) {
            var katexHolder = this.refs.katex.getDOMNode();
            katexHolder.removeAttribute("aria-hidden");

            try {
                katex.render(newText, katexHolder);

                try {
                    var katexA11yHolder = this.refs.katexA11y.getDOMNode();
                    katexA11y.render(text, katexA11yHolder);

                    katexHolder.setAttribute("aria-hidden", "true");
                } catch(e) {
                    // NOTE: If an exception is thrown from the katex-a11y logic
                    // then we assume that it doesn't know how to render the
                    // result thus we remove any a11y text and don't show it to
                    // the user.
                    this.emptyNode(katexA11yHolder);
                }

                if (this.script) {
                    var jax = MathJax.Hub.getJaxFor(this.script);
                    if (jax) {
                        jax.Remove();
                    }
                }
                onRender();
                return;
            } catch (e) {
                /* jshint -W103 */
                if (e.__proto__ !== katex.ParseError.prototype) {
                /* jshint +W103 */
                    throw e;
                }
            }

            this.emptyNode(this.refs.katex.getDOMNode());
            this.emptyNode(this.refs.katexA11y.getDOMNode());

            if (this.script) {
                var component = this;
                MathJax.Hub.Queue(function() {
                    var jax = MathJax.Hub.getJaxFor(component.script);
                    if (jax) {
                        return jax.Text(newText, onRender);
                    } else {
                        component.setScriptText(newText);
                        process(component.script, onRender);
                    }
                });
            } else {
                this.setScriptText(newText);
                process(this.script, onRender);
            }
        }
    },

    setScriptText: function(text) {
        if (!this.script) {
            this.script = document.createElement("script");
            this.script.type = "math/tex";
            this.refs.mathjax.getDOMNode().appendChild(this.script);
        }
        if ("text" in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }
    },

    componentWillUnmount: function() {
        if (this.script) {
            var jax = MathJax.Hub.getJaxFor(this.script);
            if (jax) {
                jax.Remove();
            }
        }
    },

    emptyNode: function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
});

module.exports = TeX;
