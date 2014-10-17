var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');
var styles = require('./styles.js');

var buttonStyle = styles.button.buttonStyle;
var selectedStyle = styles.button.selectedStyle;

RCSS.createClass(buttonStyle);
RCSS.createClass(selectedStyle);

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

var MultiButtonGroup = React.createClass({
    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.any),
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
            values: [],
            allowEmpty: true
        };
    },

    render: function() {
        var values = this.props.values;
        var buttons = _(this.props.buttons).map((button, i) => {
            var maybeSelected = _.contains(values, button.value) ?
                selectedStyle.className : "";
            return <button title={button.title}
                    type="button"
                    id={"" + i}
                    key = {"" + i}
                    ref={"button" + i}
                    className={`${buttonStyle.className} ${maybeSelected}`}
                    onClick={this.toggleSelect.bind(this, button.value)}>
                {button.content || "" + button.value}
            </button>;
        });

        var outerStyle = {
            display: 'inline-block'
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
        var values = this.props.values;
        var allowEmpty = this.props.allowEmpty;

        if (_.contains(values, newValue) &&
                (values.length > 1 || allowEmpty)) {
            // If the value is already selected, unselect it
            this.props.onChange(_.without(values, newValue));
        } else {
            // Otherwise merge with other values and return
            this.props.onChange(_.union(values, [newValue]));
        }
    }
});

module.exports = MultiButtonGroup;
