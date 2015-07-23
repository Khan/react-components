var Sorter = React.createClass({
    render: function() {
        return <Sortable components={this.state.components}
                         onReorder={this.handleReorder}
                         className="sidebar-list"
                         verify={() => true} />;
    },
    // {{{

    handleReorder: function(components) {
        this.setState({ components });
    },

    getInitialState: function() {
        return { components: this.props.components };
    }
    // }}}
});
// {{{

var components = [
    <div draggable={true} key="1">1</div>,
    <div draggable={true} key="2">2</div>,
    <div draggable={true} key="3">3</div>,
    <div draggable={true} key="4">4</div>
];

return <Sorter components={components} />;
// }}}
