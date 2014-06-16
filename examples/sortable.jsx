var React = require("react");
var _ = require("underscore");

var components = _(items).map(item => {
    var draggable = canEdit && item.isDraggable();
    var key = item.cid;
    var props = {
        exercise, currentItemId, navigateTo,
        item, draggable, key
    };
    props.onMove = this.handleMoveItems;

    return item instanceof AssessmentItem ?
        ItemName(_.extend(props, {ref: item.id})) :
        TypeName(_.extend(props, {canEdit: canEdit}));
});

return <SortableArea components={components}
                     onReorder={this.handleReorder}
                     className="sidebar-list"
                     verify={this.verifyOrder} />;
