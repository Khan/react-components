var ButtonWithDialog = React.createClass({
	mixins: [LayeredComponentMixin],
    render: function() {
        return <button onClick={this.handleClick}>
            Click Me!
        </button>;
    },
    renderLayer: function() {
		var style = {
            position: 'fixed',
			top: '50%',
            left: '50%'
		};

        return <div style={style}>
			{this.state.clicked ? "Clicked! (Click again to remove)"
                                : null }
        </div>;
    },
    // {{{
	handleClick: function() {
		this.setState({ clicked: !this.state.clicked });
	},
	getInitialState: function() {
		return { clicked: false };
	}
	// }}}
});

return <ButtonWithDialog />;
