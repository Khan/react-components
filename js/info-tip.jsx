/** @jsx React.DOM */

var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');

var colors = {
    grayLight: '#aaa',
    basicBorderColor: '#ccc',
    white: '#fff'
};

var infoTip = {
    display: 'inline-block',
    marginLeft: '5px',
    position: 'relative'
};

var infoTipI = {
    cursor: 'pointer'
};

var infoTipContainer = {
    position: 'absolute',
    'top': '-12px',
    left: '22px',
    zIndex: '1000'
};

var triangleBeforeAfter = {
    borderBottom: '9px solid transparent',
    borderTop: '9px solid transparent',
    content: ' ',
    height: '0',
    position: 'absolute',
    'top': '0',
    width: '0'
};

var infoTipTriangle = {
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
};

var basicBorder = {
    border: `1px solid ${colors.basicBorderColor}`
};

var boxShadow = str => { return { boxShadow: str }; };

var verticalShadow = RCSS.merge(
    basicBorder,
    boxShadow(`0 1px 3px ${colors.basicBorderColor}`),
    { borderBottom: `1px solid ${colors.grayLight}` }
);

var infoTipContentContainer = RCSS.merge(verticalShadow, {
    background: colors.white,
    padding: '5px 10px',
    width: '240px'
});

RCSS.createClass(infoTip);
RCSS.createClass(infoTipI);
RCSS.createClass(infoTipTriangle);
RCSS.createClass(verticalShadow);
RCSS.createClass(infoTipContainer);
RCSS.createClass(infoTipContentContainer);

var InfoTip = React.createClass({
    getInitialState: function() {
        return {
            hover: false
        };
    },

    /* TODO(joel) - being pragmatic here and using a question mark. Figure out
     * how to do one of the following:
     * ~ extract icon-question-sign and use a data-uri
     * ~ bundle fontawesome (sadface)
     * ~ find an even better icon?
    <i className={`icon-question-sign ${infoTipI.className}`}
       onMouseEnter={this.handleMouseEnter}
       onMouseLeave={this.handleMouseLeave} />
    */

    render: function() {
        return <div className={infoTip.className}>
            <span onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}>
                ?
            </span>
            <div className={infoTipContainer.className}
                 style={{display: this.state.hover ? 'block' : 'none'}}>
                <div className={infoTipTriangle.className} />
                {/* keep the classes here - used for selectors on KA */}
                <div className={infoTipContentContainer.className}>
                    {this.props.children}
                </div>
            </div>
        </div>;
    },

    handleMouseEnter: function() {
        this.setState({hover: true});
    },

    handleMouseLeave: function() {
        this.setState({hover: false});
    }
});

module.exports = InfoTip;
