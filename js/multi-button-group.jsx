/* MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "content": this is the JSX shown within the button, typically a string
 *         that gets rendered as the button's display text
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with an array of the updated
 *     values (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   values - an array of the initial values of the buttons selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

const React = require('react');
const ReactDOM = require("react-dom");
const styles = require('./styles.js');
const css = require("aphrodite").css;

const MultiButtonGroup = React.createClass({
    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.any),
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            content: React.PropTypes.node,
            title: React.PropTypes.string,
        })).isRequired,
        onChange: React.PropTypes.func.isRequired,
        allowEmpty: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            values: [],
            allowEmpty: true,
        };
    },

    focus: function() {
        ReactDOM.findDOMNode(this).focus();
        return true;
    },

    toggleSelect: function(newValue) {
        const values = (this.props.values || []).slice(0);
        const allowEmpty = this.props.allowEmpty;

        if (values.indexOf(newValue) >= 0 &&
                (values.length > 1 || allowEmpty)) {
            // If the value is already selected, unselect it
            values.splice(values.indexOf(newValue), 1);
        } else {
            // Otherwise merge with other values and return
            if (values.indexOf(newValue) < 0) {
                values.push(newValue);
            }
        }

        this.props.onChange(values);
    },

    render: function() {
        const values = this.props.values || [];
        const buttons = this.props.buttons.map((button, i) => {
            const selected = values.indexOf(button.value) >= 0;
            return <button title={button.title}
                type="button"
                id={"" + i}
                key = {"" + i}
                ref={"button" + i}
                className={css(
                    styles.button.buttonStyle,
                    selected && styles.button.selectedStyle
                )}
                onClick={this.toggleSelect.bind(this, button.value)}
            >
                {button.content || "" + button.value}
            </button>;
        });

        const outerStyle = {
            display: 'inline-block',
        };
        return <div style={outerStyle}>
            {buttons}
        </div>;
    },
});

module.exports = MultiButtonGroup;
