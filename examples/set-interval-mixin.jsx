var RefreshingComponent = React.createClass({
    mixins: [SetIntervalMixin],
    componentDidMount: function() {
        this.setInterval(this.updateState, 1000);
    },
	render: function() {
		return <div>{this.state.time} seconds</div>;
	},
	// {{{
	getInitialState: function() {
		return { time: 0 };
	},
	updateState: function() {
		var time = this.state.time + 1;
		this.setState({ time });
	}
	// }}}
});

return <RefreshingComponent />;
