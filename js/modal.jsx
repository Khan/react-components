/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var aphrodite = require("aphrodite");
var React = require("react");

var css = aphrodite.css;
var StyleSheet = aphrodite.StyleSheet;

var styles = StyleSheet.create({
    modalStyle: {
        position: "fixed",
        width: "500px",
        margin: "0 0 0 -250px",
        top: "60px",
        left: "50%",
        backgroundColor: "white",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "6px",
        zIndex: 1050,
    },

    modalBackdropStyle: {
        opacity: 0.7,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1040,
        backgroundColor: "black",
    },
});

/* Render a bootstrap modal.
 *
 * TODO(joel) figure out how to use the header, body, and footer styles
 *
 * Example:
 *
 *      <Modal onClose={this.props.onClose}>
 *          <div className="modal-header">
 *              <h2>{header}</h2>
 *          </div>

 *          <div className="modal-body">
 *              {body}
 *          </div>

 *          <div className="modal-footer">
 *              {footer}
 *          </div>
 *      </Modal>
 */
var Modal = React.createClass({
    propTypes: {
        className: React.PropTypes.string,

        // Close the modal when esc is pressed? Defaults to true.
        keyboard: React.PropTypes.bool,

        onClose: React.PropTypes.func,

        // TODO(joel) reimplement
        // Bootstrap modal's backdrop argument: Includes a modal-backdrop
        // element. Alternatively, specify static for a backdrop which doesn't
        // close the modal on click. Defaults to true.
        backdrop: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string
        ])
    },

    render: function() {
        var className = [
            css(styles.modalStyle),
            this.props.className,
            "modal",
        ].join(" ");
        var modal = <div
                {...this.props}
                tabIndex="-1"
                className={className}>
            {this.props.children}
        </div>;

        var backdrop = <div className={css(styles.modalBackdropStyle)} />;
        return <div>
            {modal}
            {backdrop}
        </div>;
    },

    getDefaultProps: function() {
        return {
            className: "",
            onClose: () => {},
            keyboard: true,
            backdrop: true
        };
    },

    _listenForEsc: function(event) {
        if (this.props.keyboard &&
                (event.key === "Escape" ||
                 event.keyCode === 27)) {
            this.props.onClose();
        }
    },

    componentDidMount: function() {
        window.addEventListener("keydown", this._listenForEsc, true);
    },

    componentWillUnmount: function() {
        window.removeEventListener("keydown", this._listenForEsc, true);
    }
});

module.exports = Modal;
