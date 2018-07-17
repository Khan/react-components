/**
 * The CSSTransitionGroup component uses the 'transitionend' event, which
 * browsers will not send for any number of reasons, including the
 * transitioning node not being painted or in an unfocused tab.
 *
 * This TimeoutTransitionGroup instead uses a user-defined timeout to determine
 * when it is a good time to remove the component. Currently there is only one
 * timeout specified, but in the future it would be nice to be able to specify
 * separate timeouts for enter and leave, in case the timeouts for those
 * animations differ. Even nicer would be some sort of inspection of the CSS to
 * automatically determine the duration of the animation or transition.
 *
 * This is adapted from Facebook's CSSTransitionGroup which is in the React
 * addons and under the Apache 2.0 License.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const createReactClass = require("create-react-class");
const PropTypes = require("prop-types");
const TransitionGroup = require('react-transition-group').TransitionGroup;

const TICK = 17;

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
const EVENT_NAME_MAP = {
    transitionend: {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'mozTransitionEnd',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
    },

    animationend: {
        'animation': 'animationend',
        'WebkitAnimation': 'webkitAnimationEnd',
        'MozAnimation': 'mozAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
    },
};

const endEvents = [];

(function detectEvents() {
    if (typeof window === "undefined") {
        return;
    }

    const testEl = document.createElement('div');
    const style = testEl.style;

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

    for (const baseEventName in EVENT_NAME_MAP) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            const baseEvents = EVENT_NAME_MAP[baseEventName];
            for (const styleName in baseEvents) {
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

/**
 * Functions for element class management to replace dependency on jQuery
 * addClass, removeClass and hasClass
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else if (!hasClass(element, className)) {
        element.className = element.className + ' ' + className;
    }
    return element;
}
function removeClass(element, className) {
    if (hasClass(className)) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = (' ' + element.className + ' ')
                .replace(' ' + className + ' ', ' ').trim();
        }
    }
    return element;
}
function hasClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >
            -1;
    }
}

const TimeoutTransitionGroupChild = createReactClass({
    propTypes: {
        children: PropTypes.node,
        enter: PropTypes.bool,
        enterTimeout: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        leave: PropTypes.bool,
        leaveTimeout: PropTypes.number.isRequired,
    },

    componentWillMount: function() {
        this.classNameQueue = [];
    },

    componentWillUnmount: function() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }
    },

    componentWillEnter: function(done) {
        if (this.props.enter) {
            this.transition('enter', done);
        } else {
            done();
        }
    },

    componentWillLeave: function(done) {
        if (this.props.leave) {
            this.transition('leave', done);
        } else {
            done();
        }
    },

    transition: function(animationType, finishCallback) {
        const node = ReactDOM.findDOMNode(this);
        const className = this.props.name + '-' + animationType;
        const activeClassName = className + '-active';

        const endListener = function() {
            removeClass(node, className);
            removeClass(node, activeClassName);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            finishCallback && finishCallback();
        };

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

        addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName);
    },

    queueClass: function(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
    },

    flushClassNameQueue: function() {
        if (this.isMounted()) {
            this.classNameQueue.forEach(function(name) {
                addClass(ReactDOM.findDOMNode(this), name);
            }.bind(this));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
    },

    render: function() {
        return React.Children.only(this.props.children);
    },
});

const TimeoutTransitionGroup = createReactClass({
    propTypes: {
        enterTimeout: PropTypes.number.isRequired,
        leaveTimeout: PropTypes.number.isRequired,
        transitionName: PropTypes.string.isRequired,
        transitionEnter: PropTypes.bool,
        transitionLeave: PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            transitionEnter: true,
            transitionLeave: true,
        };
    },

    _wrapChild: function(child) {
        return (
            <TimeoutTransitionGroupChild
                enterTimeout={this.props.enterTimeout}
                leaveTimeout={this.props.leaveTimeout}
                name={this.props.transitionName}
                enter={this.props.transitionEnter}
                leave={this.props.transitionLeave}
            >
                {child}
            </TimeoutTransitionGroupChild>
        );
    },

    render: function() {
        return (
            <TransitionGroup
                childFactory={this._wrapChild}
            />
        );
    },
});

module.exports = TimeoutTransitionGroup;
