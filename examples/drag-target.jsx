var Target = React.createClass({
    render: function() {
        return <DragTarget onDrop={this.handleDrop}>
            {this.state.message}
        </DragTarget>;
    },

    handleDrop: function(event) {
        this.setState({ message: "delicious. thank you!" });
    },

    getInitialState: function() {
        return { message: "I haven't received any drags" };
    }
});

return <Target />;
