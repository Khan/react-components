/**
 * @jsx React.DOM
 */

var React = require("react");

var CodeMirrorEditor = require("./code-mirror-editor.jsx");
var ComponentPreview = require("./live-compile.jsx");

var HELLO_COMPONENT = "\
var HelloMessage = React.createClass({\n\
  render: function() {\n\
    return <div>Hello {this.props.name}</div>;\n\
  }\n\
});\n\
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
