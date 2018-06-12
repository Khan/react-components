const React = require("react");
const createReactClass = require("create-react-class");
const PropTypes = require("prop-types");

/* You know when you want to propagate input to a parent...
 * but then that parent does something with the input...
 * then changing the props of the input...
 * on every keystroke...
 * so if some input is invalid or incomplete...
 * the input gets reset or otherwise effed...
 *
 * This is the solution.
 *
 * Enough melodrama. Its an input that only sends changes
 * to its parent on blur.
 */
const BlurInput = createReactClass({
    propTypes: {
        className: PropTypes.string,
        style: PropTypes.any,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    },
    getInitialState: function() {
        return {value: this.props.value};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({value: nextProps.value});
    },
    handleChange: function(e) {
        this.setState({value: e.target.value});
    },
    handleBlur: function(e) {
        this.props.onChange(e.target.value);
    },
    render: function() {
        return <input
            className={this.props.className}
            style={this.props.style}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
        />;
    },
});

module.exports = BlurInput;
