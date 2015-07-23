// {{{ TODO(joel) - numericalParse

var URLInput = React.createClass({
    render: function() {
        // {{{
        var imgStyle = {
            paddingTop: 15,
            display: 'block',
            margin: 'auto',
            maxWidth: '100%'
        };
        // }}}
        return <div>
            Image URL: <BlurInput value={this.state.url}
                       onChange={this.handleChange} />
            <img style={imgStyle} src={this.state.url} />
        </div>;
    },

    handleChange: function(url) {
        this.setState({ url });
    },

    getInitialState: function() {
        return { url: this.props.initialUrl };
    }
});

return <URLInput initialUrl={"https://www.kastatic.org/images/khan-logo-vertical-transparent.png"} />;
