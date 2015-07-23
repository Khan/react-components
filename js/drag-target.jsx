var React = require('react');
var _ = require('underscore');

/* This component makes its children a drag target. Example:
 *
 *     <DragTarget onDrop={this.handleDrop}>Drag to me</DragTarget>
 *
 *     ...
 *
 *     handleDrop: function(e) {
 *         this.addImages(e.nativeEvent.dataTransfer.files);
 *     }
 *
 * Now "Drag to me" will be a drag target - when something is dragged over it,
 * the element will become partially transparent as a visual indicator that
 * it's a target.
 */
// TODO(joel) - indicate before the hover is over the target that it's possible
// to drag into the target. This would (I think) require a high level handler -
// like on Perseus itself, waiting for onDragEnter, then passing down the
// event. Sounds like a pain. Possible workaround - create a div covering the
// entire page...
//
// Other extensions:
// * custom styles for global drag and dragOver
// * only respond to certain types of drags (only images for instance)!
var DragTarget = React.createClass({
    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        component: React.PropTypes.any,  // component type
        shouldDragHighlight: React.PropTypes.func
    },
    render: function() {
        var opacity = this.state.dragHover ? { "opacity": 0.3 } : {};
        var Component = this.props.component;

        return (
            <Component
                {...this.props}
                style={_.extend({}, this.props.style, opacity)}
                onDrop={this.handleDrop}
                onDragEnd={this.handleDragEnd}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave} />
        );
    },
    getInitialState: function() {
        return { dragHover: false };
    },
    getDefaultProps: function() {
        return {
            component: "div",
            shouldDragHighlight: () => true
        };
    },
    handleDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ dragHover: false });
        this.props.onDrop(e);
    },
    handleDragEnd: function() {
        this.setState({ dragHover: false });
    },
    handleDragOver: function(e) {
        e.preventDefault();
    },
    handleDragLeave: function() {
        this.setState({ dragHover: false });
    },
    handleDragEnter: function(e) {
        this.setState({ dragHover: this.props.shouldDragHighlight(e) });
    }
});

module.exports = DragTarget;
