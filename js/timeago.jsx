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

const React = require("react");
const SetIntervalMixin = require("./set-interval-mixin.jsx");
const moment = require("moment");

// TODO(joel) i18n
const TimeAgo = React.createClass({
    propTypes: {
        refreshMillis: React.PropTypes.number,
        time: React.PropTypes.any.isRequired,
    },
    mixins: [SetIntervalMixin],
    componentDidMount: function() {
        const interval = this.props.refreshMillis || 60000;
        // TODO(joel) why did I have to bind forceUpdate?
        this.setInterval(this.forceUpdate.bind(this), interval);
    },
    render: function() {
        return <span>{moment(this.props.time).fromNow()}</span>;
    },
});

module.exports = TimeAgo;
