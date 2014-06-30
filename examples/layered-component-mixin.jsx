var ButtonWithDialog = React.createClass({
	mixins: [LayeredComponentMixin],
    render: function() {
        return <button onClick={this.handleClick}>
            Click Me!
        </button>;
    },
    renderLayer: function() {
		var style = {
            // {{{
            position: 'fixed',
			top: '50%',
            width: '20%',
            margin: '0 40%',
            textAlign: 'center',
            zIndex: 2,
            // }}}
            visibility: this.state.clicked ? 'visible' : 'hidden'
		};

        return <div style={style} className="playgroundPreview">
			Clicked! (Click again to remove)
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
