var Options = React.createClass({
    render: function() {
        var labelStyle = {
            color: this.state.value,
            padding: '0 10px'
        };

        return <div>
            <ButtonGroup value={this.state.value}
                    buttons={[
                        {value: 'red', content: 'red'},
                        {value: 'green', content: 'green'},
                        {value: 'blue', content: 'blue'}
                    ]}
                    onChange={this.handleChange} />
            <span style={labelStyle}>Your useful text</span>
        </div>;
    },

    getInitialState: function() {
        return { value: 'red' };
    },

    handleChange: function(value) {
        this.setState({ value });
    }
});

return <Options />;
