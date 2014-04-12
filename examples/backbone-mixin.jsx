var Comment = React.createClass({
    mixins: [BackboneMixin],
    getBackboneModels: function() {
        return [this.props.model];
    },
    render: function() { ... }
});
