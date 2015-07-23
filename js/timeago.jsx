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

var React = require("react");
var SetIntervalMixin = require("./set-interval-mixin.jsx");
var moment = require("moment");

// TODO(joel) i18n
var TimeAgo = React.createClass({
    mixins: [SetIntervalMixin],
    render: function() {
        return <span>{moment(this.props.time).fromNow()}</span>;
    },
    componentDidMount: function() {
        var interval = this.props.refreshMillis || 60000;
        // TODO(joel) why did I have to bind forceUpdate?
        this.setInterval(this.forceUpdate.bind(this), interval);
    }
});

module.exports = TimeAgo;
