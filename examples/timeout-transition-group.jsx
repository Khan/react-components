// {{{
var itemStyle = {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
    cursor: "pointer"
};
// }}}

/**
 * Already in the stylesheet of the page:
 *
 * .demo-enter {
 *     opacity: 0.01;
 *     height: 0px;
 *     padding: 0px 10px !important;
 *     transition: opacity 500ms ease-out,
 *                 padding 500ms ease-out,
 *                 height 500ms ease-out;
 * }
 * .demo-enter.demo-enter-active {
 *     opacity: 1;
 *     height: 16px;
 *     padding: 10px !important;
 * }
 * .demo-leave {
 *     opacity: 1;
 *     height: 16px;
 *     transition: opacity 500ms ease-out,
 *                 padding 500ms ease-out,
 *                 height 500ms ease-out;
 * }
 * .demo-leave.demo-leave-active {
 *     opacity: 0;
 *     height: 0px;
 *     padding: 0px 10px !important;
 * }
 */

var List = React.createClass({
    getInitialState: function() {
        return {
            items: [0, 1, 2, 3]
        };
    },

    removeThenReadd: function(item) {
        // {{{
        var items = this.state.items.slice(0);
        var found = false;
        for(var i = 0; i < items.length; i++) {
            if (items[i] === item) {
                items.splice(i, 1);
                found = true;
                break;
            }
        }

        this.setState({items: items}, function() {
            if (found) {
                setTimeout(function() {
                    var items = this.state.items.slice(0);
                    items.push(item);
                    this.setState({items: items});
                }.bind(this), 5000);

            }
        }.bind(this));
        // }}}
    },

    _makeDiv: function(index) {
        // {{{
        return <div onClick={this.removeThenReadd.bind(null, index)}
                    style={itemStyle}
                    key={index}>
            {"Item " + index}
        </div>;
        // }}}
    },

    render: function() {
        var items = this.state.items.map(this._makeDiv);
        return <TimeoutTransitionGroup enterTimeout={500}
                                       leaveTimeout={500}
                                       transitionName="demo">
            {items}
        </TimeoutTransitionGroup>;
    }
});

return <List />;
