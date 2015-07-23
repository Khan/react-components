var ButtonWithDialog = React.createClass({
	mixins: [LayeredComponentMixin],
    render: function() {
        return <button onClick={this.handleClick}>
            Click Me!
        </button>;
    },
    renderLayer: function() {
        if (this.state.clicked) {
            return <Modal onClose={this.handleClose}>
                <div className="modal-header">
                    Header
                    <a href="javascript: void 0;"
                       style={{float: "right", textDecoration: "none"}}
                       onClick={this.handleClose}>
                        &#215;
                    </a>
                </div>
                <div className="modal-body">Body!</div>
            </Modal>;
        } else {
            return <div />;
        }
    },
    // {{{
    handleClose: function() {
        this.setState({ clicked: false });
    },
	handleClick: function() {
		this.setState({ clicked: !this.state.clicked });
	},
	getInitialState: function() {
		return { clicked: false };
	}
	// }}}
});

return <ButtonWithDialog />;
