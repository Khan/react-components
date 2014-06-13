var React = require('react');
var BlurInput = require('./js/blur-input.jsx');

TODO(joel) - numericalParse

// PRELUDE
var NumberInput = React.createClass({
    render: function() {
        return <BlurInput value={"" + this.state.value}
                          onChange={this.handleChange} />;
    },

    handleChange: function(str) {
        var value = numericalParse(str) || 0;
        this.setState({ value });
    },

    getInitialState: function() {
        return { value: this.props.initialValue };
    }
});
// POSTSCRIPT

React.renderComponent(
    <NumberInput initialValue={5} />,
    document.getElementById("blur-input")
);
