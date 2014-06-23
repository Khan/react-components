/**
 * @jsx React.DOM
 */

var React = require("react");

var selfCleaningTimeout = {
  componentDidUpdate: function() {
    clearTimeout(this.timeoutID);
  },

  setTimeout: function() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  }
};

var ComponentPreview = React.createClass({
    propTypes: {
      code: React.PropTypes.string.isRequired
    },

    mixins: [selfCleaningTimeout],

    render: function() {
        return <div ref="mount" />;
    },

    componentDidMount: function() {
      this.executeCode();
    },

    componentDidUpdate: function(prevProps) {
      // execute code only when the state's not being updated by switching tab
      // this avoids re-displaying the error, which comes after a certain delay
      if (this.props.code !== prevProps.code) {
        this.executeCode();
      }
    },

    compileCode: function() {
      return JSXTransformer.transform(
          '/** @jsx React.DOM */' +
          '(function() {' +
              this.props.code +
          '})();'
      ).code;
    },

    executeCode: function() {
      var mountNode = this.refs.mount.getDOMNode();

      try {
        React.unmountComponentAtNode(mountNode);
      } catch (e) { }

      try {
        var compiledCode = this.compileCode();
        React.renderComponent(eval(compiledCode), mountNode);
      } catch (err) {
        this.setTimeout(function() {
          React.renderComponent(
            <div className="playgroundError">{err.toString()}</div>,
            mountNode
          );
        }, 500);
      }
    }
});

module.exports = ComponentPreview;
