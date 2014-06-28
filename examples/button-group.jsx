var Options = React.createClass({
    render: function() {
        var labelStyle = {
            color: this.state.value
        };
        var outerStyle = {
            padding: '5px 0'
        };
        return <div>
            Options:
            <div style={outerStyle}>
                <ButtonGroup value={this.state.value}
                             buttons={[
                                {value: 'red', text: 'red'},
                                {value: 'green', text: 'green'},
                                {value: 'blue', text: 'blue'}
                             ]}
                             onChange={this.handleChange} />
            </div>
            <div style={labelStyle}>Your useful text</div>
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
