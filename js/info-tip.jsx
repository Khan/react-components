/** @jsx React.DOM */

var InfoTip = React.createClass({
    getInitialState: function() {
        return {
            hover: false
        };
    },

    render: function() {
        return <span className="info-tip">
            <i className="icon-question-sign"
               onMouseEnter={this.handleMouseEnter}
               onMouseLeave={this.handleMouseLeave} />
            <span className="info-tip-container"
                  style={{display: this.state.hover ? 'block' : 'none'}}>
                <span className="info-tip-triangle" />
                <span className="info-tip-content-container vertical-shadow">
                    {this.props.children}
                </span>
            </span>
        </span>;
    },

    handleMouseEnter: function() {
        this.setState({hover: true});
    },

    handleMouseLeave: function() {
        this.setState({hover: false});
    }
});

module.exports = InfoTip;
