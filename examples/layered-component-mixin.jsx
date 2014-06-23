var ButtonWithDialog = React.createClass({
	mixins: [LayeredComponentMixin],
    render: function() {
        return <button onClick={this.handleClick}>
            Click Me!
        </button>;
    },
    renderLayer: function() {
		var style = {
			position: 'absolute',
			top: '50%',
			bottom: '50%'
		};

        return <div style={style}>
			{this.state.clicked ? "clicked!" : null }
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
