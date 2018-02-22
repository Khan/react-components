"use strict";
/**
 * For math rendered using KaTex and/or MathJax. Use me like <TeX>2x + 3</TeX>.
 */
/* global katex, MathJax, Khan */
// TODO(joel) - require MathJax / katex so they don't have to be global

const PureRenderMixin = require("react-addons-pure-render-mixin");
const React = require("react");
const ReactDOM = require("react-dom");

const katexA11y = require("./katex-a11y.js");

let pendingScripts = [];
let pendingCallbacks = [];
let needsProcess = false;

// For creating unique element ids required by the aria-describedby attribute
let describedByIdCounter = 0;

const process = (script, callback) => {
    pendingScripts.push(script);
    pendingCallbacks.push(callback);
    if (!needsProcess) {
        needsProcess = true;
        setTimeout(doProcess, 0);
    }
};

const loadMathJax = callback => {
    if (typeof MathJax !== "undefined") {
        callback();
    } else if (typeof Khan !== "undefined" && Khan.mathJaxLoaded) {
        Khan.mathJaxLoaded.then(callback);
    } else {
        throw new Error("MathJax wasn't loaded before it was needed by <TeX/>");
    }
};

const doProcess = () => {
    loadMathJax(() => {
        MathJax.Hub.Queue(function() {
            const oldElementScripts = MathJax.Hub.elementScripts;
            MathJax.Hub.elementScripts = element => pendingScripts;

            try {
                return MathJax.Hub.Process(null, () => {
                    // Trigger all of the pending callbacks before clearing them
                    // out.
                    for (const callback of pendingCallbacks) {
                        callback();
                    }

                    pendingScripts = [];
                    pendingCallbacks = [];
                    needsProcess = false;
                });
            } catch (e) {
                // IE8 requires `catch` in order to use `finally`
                throw e;
            } finally {
                MathJax.Hub.elementScripts = oldElementScripts;
            }
        });
    });
};

// Make content only visible to screen readers.
// Both collegeboard.org and Bootstrap 3 use this exact implementation.
const srOnly = {
    border: 0,
    clip: "rect(0,0,0,0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    width: "1px",
};

const TeX = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        katexOptions: React.PropTypes.any,
        onClick: React.PropTypes.func,
        onRender: React.PropTypes.func,
        style: React.PropTypes.any,
    },

    mixins: [PureRenderMixin],

    getDefaultProps: function() {
        return {
            katexOptions: {
                // There was a breaking change in the behavior of \color{}
                // in KaTeX 0.8.0. KA content relies on the old behavior
                // so we set this option to retain that old behavior even
                // though it is not purely compatible with LaTeX.
                // See https://github.com/Khan/KaTeX/blob/master/README.md
                // for details on this option.
                colorIsTextColor: true,
            },
            // Called after math is rendered or re-rendered
            onRender: function() {},
            onClick: null,
        };
    },

    componentDidMount: function() {
        this._root = ReactDOM.findDOMNode(this);

        if (this.refs.katex.childElementCount > 0) {
            // If we already rendered katex in the render function, we don't
            // need to render anything here.
            this.props.onRender(this._root);
            return;
        }

        const text = this.props.children;

        this.setScriptText(text);
        process(this.script, () => this.props.onRender(this._root));
    },

    componentDidUpdate: function(prevProps, prevState) {
        // If we already rendered katex in the render function, we don't
        // need to render anything here.
        if (this.refs.katex.childElementCount > 0) {
            if (this.script) {
                // If we successfully rendered KaTeX, check if there's
                // lingering MathJax from the last render, and if so remove it.
                loadMathJax(() => {
                    const jax = MathJax.Hub.getJaxFor(this.script);
                    if (jax) {
                        jax.Remove();
                    }
                });
            }

            this.props.onRender();
            return;
        }

        const newText = this.props.children;

        if (this.script) {
            loadMathJax(() => {
                MathJax.Hub.Queue(() => {
                    const jax = MathJax.Hub.getJaxFor(this.script);
                    if (jax) {
                        return jax.Text(newText, this.props.onRender);
                    } else {
                        this.setScriptText(newText);
                        process(this.script, this.props.onRender);
                    }
                });
            });
        } else {
            this.setScriptText(newText);
            process(this.script, this.props.onRender);
        }
    },

    componentWillUnmount: function() {
        if (this.script) {
            loadMathJax(() => {
                const jax = MathJax.Hub.getJaxFor(this.script);
                if (jax) {
                    jax.Remove();
                }
            });
        }
    },

    setScriptText: function(text) {
        if (!this.script) {
            this.script = document.createElement("script");
            this.script.type = "math/tex";
            ReactDOM.findDOMNode(this.refs.mathjax).appendChild(this.script);
        }
        if ("text" in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }
    },

    render: function() {
        // First, try to render the math content with KaTeX.
        // If this fails, we ignore the KaTeX error and just render
        // an empty span. Later, componentDidUpdate() will notice
        // and will use MathJAX instead.
        let katexHtml = null;
        try {
            katexHtml = {
                __html: katex.renderToString(
                    this.props.children,
                    this.props.katexOptions,
                ),
            };
        } catch (e) {
            /* jshint -W103 */
            if (e.__proto__ !== katex.ParseError.prototype) {
                /* jshint +W103 */
                throw e;
            }
        }

        // If we successfully parsed with KaTeX, then try parse the
        // same math text to an english rendering that can be read
        // by screen readers. Our katexA11y module is out of date and
        // not well maintained, so it can not always transform math
        // into readable english. We ignore any exceptions it throws.
        let katexA11yHtml = null;
        let describedById = null;
        if (katexHtml) {
            try {
                katexA11yHtml = {
                    __html: katexA11y.renderString(this.props.children),
                };
                describedById = `katex-${++describedByIdCounter}`;
            } catch (e) {
                // Nothing
            }
        }

        return (
            <span style={this.props.style} onClick={this.props.onClick}>
                {/* MathJAX output goes here if KaTeX parsing fails */}
                <span ref="mathjax" />
                {/*
                  * KaTeX output goes here. If we successfully converted the
                  * math to readable english, then we hide all of this from
                  * screen readers with aria-hidden.
                  */}
                <span
                    ref="katex"
                    dangerouslySetInnerHTML={katexHtml}
                    aria-hidden={!!katexA11yHtml}
                    aria-describedby={describedById}
                />
                {/*
                  * If we generated readable english text, it goes here.
                  * The srOnly styles will prevent it from being displayed
                  * visually.
                  */}
                <span
                    dangerouslySetInnerHTML={katexA11yHtml}
                    id={describedById}
                    style={srOnly}
                />
            </span>
        );
    },
});

module.exports = TeX;
