var SimpleModel = Backbone.Model.extend({
    defaults: {
        comment: "This is a comment!"
    }
});

var Comment = React.createClass({
    mixins: [BackboneMixin],
    getBackboneModels: function() {
        return [this.props.model];
    },
    render: function() {
        return <div>{this.props.model.get("comment")}</div>;
    }
});

var myModel = new SimpleModel();

return <div>
    <Comment model={myModel} />
    <button onClick={function() {myModel.set("comment", "This is an (edited) comment!");}}>
        Edit
    </button>
</div>;
