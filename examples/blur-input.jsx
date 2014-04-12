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
