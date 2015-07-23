// {{{
var FormatCommentBody = React.createClass({
	render: function() {
		return <div>
			{this.props.body}
		</div>;
	}
});

var UserBadge = React.createClass({
	render: function() {
		return <div>@{this.props.user}</div>;
	}
});

// }}}

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

return <Comment body="such time" user="dinojoel" date={new Date()} />;
