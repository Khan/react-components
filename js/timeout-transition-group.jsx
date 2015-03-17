/**
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. If available, the
 * TimeoutTransitionGroup now determines the timeouts from css.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 */

'use strict';

var React = require('react/addons');

var ReactTransitionGroup = React.addons.TransitionGroup;

var TICK = 17;

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd'
    }
};

var endEvents = [];

(function detectEvents() {
    if (typeof window === "undefined") {
        return;
    }

    var testEl = document.createElement('div');
    var style = testEl.style;

    // On some platforms, in particular some releases of Android 4.x, the
    // un-prefixed "animation" and "transition" properties are defined on the
    // style object but the events that fire will still be prefixed, so we need
    // to check if the un-prefixed events are useable, and if not remove them
    // from the map
    if (!('AnimationEvent' in window)) {
        delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            var baseEvents = EVENT_NAME_MAP[baseEventName];
            for (var styleName in baseEvents) {
                if (styleName in style) {
                    endEvents.push(baseEvents[styleName]);
                    break;
                }
            }

        }
    }
})();

function animationSupported() {
    return endEvents.length !== 0;
}

var TimeoutTransitionGroupChild = React.createClass({
    transition: function (animationType, finishCallback) {
        var $node = $(this.getDOMNode());
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';
        
        var endListener = function () {
            $node.removeClass(className);
            $node.removeClass(activeClassName);
            
            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            finishCallback && finishCallback();
            
            if (animationType === 'leave' && this.props.leftCallback) {
                this.props.leftCallback();
            }
        }.bind(this);
        
        if (!animationSupported()) {
            endListener();
            } else {
            if (animationType === "enter") {
                this.animationTimeout = setTimeout(endListener,
                this.props.enterTimeout);
                } else if (animationType === "leave") {
                this.animationTimeout = setTimeout(endListener,
                this.props.leaveTimeout);
            }
        }
        
        $node.addClass(className);
        
        // fast forward the animation
        $node.css({
            'transitionDuration': '0s',
            'transitionDelay': '0s'
        });
        
        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },
    
    queueClass: function (className) {
        this.classNameQueue.push(className);
        
        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },
    
    flushClassNameQueue: function () {
        if (this.isMounted()) {
            var $node = $(this.getDOMNode());
            // clear styles so animation will run
            $node.css({
                'transitionDuration': '',
                'transitionDelay': ''
            });
            // trigger animation
            this.classNameQueue.forEach(function (name) {
                $node.addClass(name);
            }.bind(this));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },
    
    componentWillMount: function () {
        this.classNameQueue = [];
    },
    
    componentWillUnmount: function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    },
    
    componentWillEnter: function (done) {
        if (this.props.enter) {
            this.transition('enter', done);
            } else {
            done();
        }
    },
    
    componentWillLeave: function (done) {
        if (this.props.leave) {
            this.transition('leave', done);
            } else {
            done();
        }
    },
    
    render: function () {
        return React.Children.only(this.props.children);
    }
});

var knownCssTimings = {};

var TimeoutTransitionGroup = React.createClass({
    propTypes: {
        enterTimeout: React.PropTypes.number,
        leaveTimeout: React.PropTypes.number,
        transitionName: React.PropTypes.string.isRequired,
        transitionEnter: React.PropTypes.bool,
        transitionLeave: React.PropTypes.bool,
        leftCallback: React.PropTypes.func
    },
    
    getDefaultProps: function () {
        return {
            enterTimeout: 600,
            leaveTimeout: 600,
            transitionEnter: true,
            transitionLeave: true
        };
    },
    
    componentDidMount: function () {
        if (!knownCssTimings[this.props.transitionName]) {
            var $this = $(this.getDOMNode());
            var $base = $('<div class="' + this.props.transitionName + '" />').appendTo($this);
            var $enter = $('<div class="' + this.props.transitionName + '-enter" />').appendTo($this);
            var $leave = $('<div class="' + this.props.transitionName + '-leave" />').appendTo($this);
            var enterDuration = $enter.css('transitionDuration');
            var enterDelay = $enter.css('transitionDelay');
            var leaveDuration = $leave.css('transitionDuration');
            var leaveDelay = $leave.css('transitionDelay');
            var cssTimings = {
                baseDuration: $base.css('transitionDuration'),
                baseDelay: $base.css('transitionDelay')
            };
            cssTimings.enterDuration = enterDuration === "0s" ? cssTimings.baseDuration : enterDuration;
            cssTimings.enterDelay = enterDelay === "0s" ? cssTimings.baseDelay : enterDelay;
            cssTimings.enterTimeout = (parseFloat(cssTimings.enterDuration) + parseFloat(cssTimings.enterDelay)) * 1000;
            
            cssTimings.leaveDuration = leaveDuration === "0s" ? cssTimings.baseDuration : leaveDuration;
            cssTimings.leaveDelay = leaveDelay === "0s" ? cssTimings.baseDelay : leaveDelay;
            cssTimings.leaveTimeout = (parseFloat(cssTimings.leaveDuration) + parseFloat(cssTimings.leaveDelay)) * 1000;
            
            knownCssTimings[this.props.transitionName] = cssTimings;
            
            $base.remove();
            $enter.remove();
            $leave.remove();
        }
    },
    
    _wrapChild: function (child) {
        var enterTimeout = this.props.enterTimeout;
        var leaveTimeout = this.props.leaveTimeout;
        
        if (knownCssTimings[this.props.transitionName]) {
            enterTimeout = knownCssTimings[this.props.transitionName].enterTimeout;
            leaveTimeout = knownCssTimings[this.props.transitionName].leaveTimeout;
        }
        
        return (
        <TimeoutTransitionGroupChild
        enterTimeout={enterTimeout}
        leaveTimeout={leaveTimeout}
        name={this.props.transitionName}
        enter={this.props.transitionEnter}
        leave={this.props.transitionLeave}
        leftCallback={this.props.leftCallback}>
        {child}
        </TimeoutTransitionGroupChild>
        );
    },
    
    render: function () {
        return (
        <ReactTransitionGroup
        {...this.props}
        childFactory={this._wrapChild}/>
        );
    }
});

module.exports = TimeoutTransitionGroup;