var React = require("react");
var _ = require("underscore");

/* The solution to detecting drags into and out of the page.
 *
 * This could be generalized to detect drags into and out of arbitrary
 * elements.
 *
 * _collection keeps track of elements which have had dragenter but not
 * dragleave fired on them. As long as that set contains an element, the page
 * has been dragged into.
 *
 * Rewrite of http://stackoverflow.com/a/10310815/2121468
 */
var WindowDrag = React.createClass({
    render: function() {
        if (this.state.dropTargetShown) {
            return <div onDrop={this.handleDrop}>
                {this.props.children}
            </div>;
        } else {
            return <div />;
        }
    },

    getInitialState: function() {
        return { dropTargetShown: false };
    },

    componentDidMount: function() {
        this._collection = [];

        window.addEventListener("dragenter", this._handleDragEnter);
        window.addEventListener("dragleave", this._handleDragLeave);
        window.addEventListener("drop",      this._handleDragLeave);
    },

    componentWillUnmount: function() {
        window.removeEventListener("dragenter", this._handleDragEnter);
        window.removeEventListener("dragleave", this._handleDragLeave);
        window.removeEventListener("drop",      this._handleDragLeave);
    },

    handleDrop: function(event) {
        this.setState({ dropTargetShown: false });
    },

    _handleDragEnter: function(event) {
        if (this._collection.length === 0) {
            this.setState({ dropTargetShown: true });
        }

        this._collection = _(this._collection).union([event.target]);
    },

    _handleDragLeave: function(event) {
        this._collection = _(this._collection).without(event.target);

        if (this._collection.length === 0) {
            this.setState({ dropTargetShown: false });
        }
    }
});

module.exports = WindowDrag;
