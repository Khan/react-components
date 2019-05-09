const CopyForm = React.createClass({
    _getTarget: function() {
        return this.targetElement;
    },
    render: function() {
        return (
            <div>
                <input placeholder="type something"
                    ref={(ref) => this.targetElement = ref}
                />
                <CopyButton targetElement={this._getTarget}/>
            </div>
        );
    },
});

return <CopyForm />;
