// PRELUDE
var RefreshingComponent = React.createClass({
    mixins: [SetIntervalMixin],
    componentDidMount: function() {
        this.setInterval(this.checkForUpdates, 30*1000);
    }
});
// POSTSCRIPT
