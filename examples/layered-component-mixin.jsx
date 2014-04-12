var ButtonWithDialog = React.createClass({
    render: function() {
        return <button onClick={() => this.setState({clicked: true})}>
            Click Me!
        </button>;
    },
    renderLayer: function() {
        if (!this.state.clicked) {
            return null;
        }

        return <Dialog>
            clicked!
        </Dialog>;
    }
    ...
});
