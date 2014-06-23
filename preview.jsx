/**
 * @jsx React.DOM
 */

var React = require('react');
var CodeMirrorEditor = require("./react-live-editor/code-mirror-editor.jsx");
var ComponentPreview = require("./react-live-editor/live-compile.jsx");

// Bring all these into scope
window.BackboneMixin = require("./js/backbone-mixin.jsx");
window.BlurInput = require("./js/blur-input.jsx");
window.ButtonGroup = require("./js/button-group.jsx");
window.$_ = require("./js/i18n.jsx");
window.InfoTip = require("./js/info-tip.jsx");
window.LayeredComponentMixin = require("./js/layered-component-mixin.jsx");
window.SetIntervalMixin = require("./js/set-interval-mixin.jsx");
window.Sortable = require("./js/sortable.jsx");
window.TeX = require("./js/tex.jsx");
window.TimeAgo = require("./js/timeago.jsx");
window.Tooltip = require("./js/tooltip.jsx");

var HELLO_COMPONENT = "\
\/\/ {{{\n\
var HelloMessage = React.createClass({\n\
  render: function() {\n\
    return <div>Hello {this.props.name}</div>;\n\
  }\n\
});\n\
\/\/ }}}\n\
\n\
return <HelloMessage name=\"John\" />;\
";

var ReactPlayground = React.createClass({
  propTypes: {
    codeText: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      code: this.props.codeText
    };
  },

  handleCodeChange: function(code) {
    this.setState({ code });
  },

  render: function() {
    return <div className="playground">
      <div className="playgroundCode">
        <CodeMirrorEditor key="jsx"
                          onChange={this.handleCodeChange}
                          className="playgroundStage"
                          codeText={this.state.code} />
      </div>
      <div className="playgroundPreview">
        <ComponentPreview code={this.state.code} />
      </div>
    </div>;
  },
});

React.renderComponent(
  <ReactPlayground codeText={HELLO_COMPONENT} />,
  document.getElementById('jsxCompiler')
);
