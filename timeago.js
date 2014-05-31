/** @jsx React.DOM */

/* The equivalent to jQuery.timeago for react.
 *
 * TimeAgo returns a span containing the amount of time (in English) that has
 * passed since `time`.
 *
 * Takes:
 *     time: an ISO 8601 timestamp
 *     refreshMillis: how often to update, in milliseconds
 *
 * Example:
 *
 *     return <a href={khanAcademy}><TimeAgo time={date} /></a>
 */

var SetIntervalMixin = require("./set-interval-mixin.jsx");
var moment = require("moment");

// TODO(joel) i18n
var TimeAgo = React.createClass({displayName: 'TimeAgo',
    mixins: [SetIntervalMixin],
    render: function() {
        return React.DOM.span(null, moment(this.props.time).fromNow());
    },
    componentDidMount: function() {
        var interval = this.props.time || 60000;
        // TODO(joel) why did I have to bind forceUpdate?
        this.setInterval(this.forceUpdate.bind(this), interval);
    }
});

module.exports = TimeAgo;
