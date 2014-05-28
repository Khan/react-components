/** @jsx React.DOM */

var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');

var infoTip = RCSS.createClass({
    marginLeft: '5px',
    position: 'relative'
});

var infoTipI = RCSS.createClass({
    cursor: 'pointer'
});

var infoTipContainer = RCSS.createClass({
    position: 'absolute',
    'top': '-12px',
    left: '22px',
    zIndex: '1000'
});

var triangleBeforeAfter = {
    borderBottom: '9px solid transparent',
    borderTop: '9px solid transparent',
    content: ' ',
    display: 'block',
    height: '0',
    position: 'absolute',
    'top': '0',
    width: '0'
};

var infoTipTriangle = RCSS.createClass({
    display: 'block',
    height: '10px',
    left: '0',
    position: 'absolute',
    'top': '8px',
    width: '0',
    zIndex: '1',

    ':before': _.extend({}, triangleBeforeAfter, {
        borderRight: '9px solid #bbb',
        right: '0',
    }),

    ':after': _.extend({}, triangleBeforeAfter, {
        borderRight: `9px solid ${colors.white}`,
        right: '-1px'
    })
});

var colors = {
    grayLight: '#aaa',
    basicBorderColor: '#ccc',
    white: '#fff'
};

var basicBorder = RCSS.createClass({
    border: `1px solid ${colors.basicBorderColor}`
});

var boxShadow = str => RCSS.createClass({ boxShadow: str })

var verticalShadow = RCSS.merge(
    basicBorder,
    boxShadow(`0 1px 3px ${colors.basicBorderColor}`),
    { borderBottom: `1px solid ${colors.grayLight}` }
);

var infoTipContentContainer = RCSS.merge(verticalShadow, {
    display: 'block',
    background: colors.white,
    padding: '5px 10px',
    width: '240px',
});

var InfoTip = React.createClass({
    getInitialState: function() {
        return {
            hover: false
        };
    },

    render: function() {
        return <span className={infoTip}>
            <i className={`icon-question-sign ${infoTipI}`}
               onMouseEnter={this.handleMouseEnter}
               onMouseLeave={this.handleMouseLeave} />
            <span className={infoTipContainer}
                  style={{display: this.state.hover ? 'block' : 'none'}}>
                <span className={infoTipTriangle} />
                {/* keep the classes here - used for selectors on KA */}
                <span className={infoTipContentContainer}>
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
