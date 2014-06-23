var Options = React.createClass({
    render: function() {
        return <div>
            Options
            <ButtonGroup value={this.state.value}
                         buttons={[
                            {value: '1', text: '1'},
                            {value: '2', text: '2'},
                            {value: '3', text: '3'}
                         ]}
                         onChange={this.handleChange} />
        </div>;
    },
    // {{{

    getInitialState: function() {
        return { value: '1' };
    },

    handleChange: function(value) {
        this.setState({ value });
    }
    // }}}
});

return <Options />;
