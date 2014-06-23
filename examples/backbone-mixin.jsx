// {{{ TODO(joel) - use backbone! }}}

var Comment = React.createClass({
    mixins: [BackboneMixin],
    getBackboneModels: function() {
		return [];
        // return [this.props.model];
    },
    render: function() {
		return <div>comment!</div>;
	}
});

return <Comment />;
