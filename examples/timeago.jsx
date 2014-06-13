// PRELUDE
var Comment = React.createClass({
    render: function() {
        return <div>
            <FormatCommentBody body={this.props.body} />

            <div>
                <UserBadge user={this.props.user} /> -
                <TimeAgo time={this.props.date} />
            </div>
        </div>;
    }
});
// POSTSCRIPT
