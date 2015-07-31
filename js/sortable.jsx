var React = require('react');
var PT    = React.PropTypes;

var sortableDragging = {
    cursor: "ns-resize"
};

var sortableEnabled = {
    cursor: "pointer"
};

var userSelect = rhs => {
    return {
        "-webkit-user-select": rhs,
        "-khtml-user-drag": rhs,
        "-khtml-user-select": rhs,
        "-moz-user-select": rhs,
        "-ms-user-select": rhs,
        userSelect: rhs
    };
};

var sortableDisabled = userSelect("none");

/**
 * Return the values from arr1 that are not present in arr2.
 */
function difference(arr1, arr2) {
    return Array.prototype.filter.call(arr1, (item) => {return arr2.indexOf(item) < 0});
}

// Takes an array of components to sort
var SortableArea = React.createClass({
    propTypes: {
        components: PT.arrayOf(PT.node).isRequired,
        onReorder: PT.func.isRequired,
        verify: PT.func
    },
    render: function() {
        var sortables = this.state.components.map((component, index) =>
            <SortableItem
                index={index}
                component={component}
                area={this}
                key={component.key}
                draggable={component.props.draggable}
                dragging={index === this.state.dragging} />
        );
        return <ol className={this.props.className} style={this.props.style}>
            {sortables}
        </ol>;
    },
    getDefaultProps: function() {
        return { verify: () => true };
    },
    getInitialState: function() {
        return {
            // index of the component being dragged
            dragging: null,
            components: this.props.components
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ components: nextProps.components });
    },
    // Alternatively send each handler to each component individually,
    // partially applied
    onDragStart: function(startIndex) {
        this.setState({ dragging: startIndex });
    },
    onDrop: function() {
        // tell the parent component
        this.setState({ dragging: null });
        this.props.onReorder(this.state.components);
    },
    onDragEnter: function(enterIndex) {
        // When a label is first dragged it triggers a dragEnter with itself,
        // which we don't care about.
        if (this.state.dragging === enterIndex) {
            return;
        }

        var newComponents = this.state.components.slice();

        // splice the tab out of its old position
        var removed = newComponents.splice(this.state.dragging, 1);
        // ... and into its new position
        newComponents.splice(enterIndex, 0, removed[0]);

        var verified = this.props.verify(newComponents);
        if (verified) {
            this.setState({
                dragging: enterIndex,
                components: newComponents
            });
        }
        return verified;
    },

    // Firefox refuses to drag an element unless you set data on it. Hackily
    // add data each time an item is dragged.
    componentDidMount: function() {
        this._setDragEvents();
    },
    componentDidUpdate: function() {
        this._setDragEvents();
    },
    _listenEvent: function(e) {
        e.dataTransfer.setData('hackhackhack', 'because browsers!');
    },
    _cancelEvent: function(e) {
        // prevent the browser from redirecting to 'because browsers!'
        e.preventDefault();
    },
    _setDragEvents: function() {
        this._dragItems = this._dragItems || [];
        var items = this.getDOMNode().querySelectorAll('[draggable=true]');
        var oldItems = difference(this._dragItems, items);
        var newItems = difference(items, this._dragItems);

        newItems.forEach(dragItem => {
            dragItem.addEventListener('dragstart', this._listenEvent);
            dragItem.addEventListener('drop',      this._cancelEvent);
        });

        oldItems.forEach(dragItem => {
            dragItem.removeEventListener('dragstart', this._listenEvent);
            dragItem.removeEventListener('drop',      this._cancelEvent);
        });
    }
});

// An individual sortable item
var SortableItem = React.createClass({
    propTypes: {
        // item: what is this?
    },
    render: function() {
        var dragState = "sortable-disabled";
        if (this.props.dragging) {
            dragState = "sortable-dragging";
        } else if (this.props.draggable) {
            dragState = "sortable-enabled";
        }

        return <li draggable={this.props.draggable}
                   className={dragState}
                   onDragStart={this.handleDragStart}
                   onDrop={this.handleDrop}
                   onDragEnter={this.handleDragEnter}
                   onDragOver={this.handleDragOver}>
            {this.props.component}
        </li>;
    },
    handleDragStart: function(e) {
        e.nativeEvent.dataTransfer.effectAllowed = "move";
        this.props.area.onDragStart(this.props.index);
    },
    handleDrop: function() {
        this.props.area.onDrop(this.props.index);
    },
    handleDragEnter: function(e) {
        var verified = this.props.area.onDragEnter(this.props.index);
        // Ideally this would change the cursor based on whether this is a
        // valid place to drop.
        e.nativeEvent.dataTransfer.effectAllowed = verified ? "move" : "none";
    },
    handleDragOver: function(e) {
        // allow a drop by preventing default handling
        e.preventDefault();
    }
});

module.exports = SortableArea;
