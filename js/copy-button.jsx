const React = require("react");

/* Copy to clipboard button
 * attach to input, textarea or any other "text container" (div, span, label..)
 */
const CopyButton = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        defaultLabel: React.PropTypes.string,
        didCopyLabel: React.PropTypes.string,
        notSupportedLabel: React.PropTypes.string,
        notSupportedLabelMac: React.PropTypes.string,
        targetElement: React.PropTypes.func.isRequired,
    },
    getDefaultProps: function() {
        return {
            defaultLabel: "Copy",
            didCopyLabel: "Copied",
            notSupportedLabel: "Ctrl+C to copy",
            notSupportedLabelMac: "⌘-C to copy",
        };
    },
    getInitialState: function() {
        return {text: this.props.defaultLabel};
    },
    _copy: function() {
        const element = this.props.targetElement();
        const selection = window.getSelection();

        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            element.focus();
            element.setSelectionRange(0, element.value.length);
        } else {
            const range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        const result = document.execCommand('copy');
        this._handleResult(result, selection);
    },
    _handleResult: function(result, selection) {
        let label;
        if (!result) {
            if (navigator.platform.indexOf("Mac") !== -1) {
                label = this.props.notSupportedLabelMac;
            } else {
                label = this.props.notSupportedLabel;
            }
        } else {
            label = this.props.didCopyLabel;
            this.props.targetElement().blur();
            selection.removeAllRanges();
        }

        this.setState({
            text: label,
        });
        const _this = this;
        setTimeout(function() {
            _this.setState({
                text: _this.props.defaultLabel,
            });
        }, 1000);
    },
    render: function() {
        return (
            <button
                className={this.props.className}
                onClick={this._copy}
            >
              {this.state.text}
            </button>
        );
    },
});

module.exports = CopyButton;
