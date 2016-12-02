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

const React = require("react");

const WindowDrag = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
    },

    getInitialState: function() {
        return {dropTargetShown: false};
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
        this.setState({dropTargetShown: false});
    },

    _handleDragEnter: function(event) {
        if (this._collection.length === 0) {
            this.setState({dropTargetShown: true});
        }

        if (this._collection.indexOf(event.target) < 0) {
            this._collection.push(event.target);
        }
    },

    _handleDragLeave: function(event) {
        if (this._collection.indexOf(event.target) >= 0) {
            this._collection.splice(this._collection.indexOf(event.target), 1);
        }

        if (this._collection.length === 0) {
            this.setState({dropTargetShown: false});
        }
    },

    render: function() {
        if (this.state.dropTargetShown) {
            return <div onDrop={this.handleDrop}>
                {this.props.children}
            </div>;
        } else {
            return <div />;
        }
    },
});

module.exports = WindowDrag;
