var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');
var styles = require('./styles.js');

var buttonStyle = styles.button.buttonStyle;
var selectedStyle = styles.button.selectedStyle;

RCSS.createClass(buttonStyle);
RCSS.createClass(selectedStyle);

/* ButtonGroup is an aesthetically pleasing group of buttons.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "content": this is the JSX shown within the button, typically a string
 *         that gets rendered as the button's display text
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with the updated value
 *     (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   value - the initial value of the button selected, defaults to null.
 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var ButtonGroup = React.createClass({
    propTypes: {
        value: React.PropTypes.any,
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            content: React.PropTypes.node,
            title: React.PropTypes.string
        })).isRequired,
        onChange: React.PropTypes.func.isRequired,
        allowEmpty: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            value: null,
            allowEmpty: true
        };
    },

    render: function() {
        var value = this.props.value;
        var buttons = _(this.props.buttons).map((button, i) => {
                var maybeSelected = button.value === value ?
                        selectedStyle.className :
                        "";
                return <button title={button.title}
                        type="button"
                        id={"" + i}
                        ref={"button" + i}
                        key={"" + i}
                        className={`${buttonStyle.className} ${maybeSelected}`}
                        onClick={this.toggleSelect.bind(this, button.value)}>
                    {button.content || "" + button.value}
                </button>;
            });

        var outerStyle = {
            display: 'inline-block',
        };
        return <div style={outerStyle}>
            {buttons}
        </div>;
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toggleSelect: function(newValue) {
        var value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    }
});

module.exports = ButtonGroup;
