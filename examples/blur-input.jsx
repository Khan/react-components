// {{{ TODO(joel) - numericalParse

var NumberInput = React.createClass({
    render: function() {
        return <div>
            <BlurInput value={"" + this.state.value}
                       onChange={this.handleChange} />
            {" -> "}
            {this.state.value}
        </div>;
    },

    handleChange: function(str) {
        var value = +str || 0;
        this.setState({ value });
    },

    getInitialState: function() {
        return { value: this.props.initialValue };
    }
});

return <NumberInput initialValue={5} />;
