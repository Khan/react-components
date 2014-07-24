var Options = React.createClass({
    render: function() {
        // {{{
        // Returns a small, colored div
        var paint = function (color) {
            var style = {
                backgroundColor: color,
                border: (color === 'white') ? '1px solid' : null,
                height: 15,
                width: 15,
                display: 'inline-block'
            };
            return <div style={style} />;
        };

        var outerStyle = {
            padding: '0 10px',
            display: 'inline-block'
        };
        // }}}

        return <div>
            Mixing Colors:
            <div style={outerStyle}>
                <MultiButtonGroup values={this.state.values}
                        buttons={[
                            {value: 'red', content: paint('red')},
                            {value: 'green', content: paint('green')},
                            {value: 'blue', content: paint('blue')}
                        ]}
                        onChange={this.handleChange} />
            </div>
            {paint(this.mixColors(this.state.values))}
        </div>;
    },

    getInitialState: function() {
        return { values: ['red', 'blue'] };
    },

    // {{{
    mixColors: function(colors) {
        var containsRed = colors.indexOf('red') > -1;
        var containsBlue = colors.indexOf('blue') > -1;
        var containsGreen = colors.indexOf('green') > -1;

        if (containsRed && containsGreen && containsBlue) {
            return 'white';
        } else if (containsRed && containsGreen) {
            return 'yellow';
        } else if (containsRed && containsBlue) {
            return 'purple';
        } else if (containsGreen && containsBlue) {
            return 'cyan';
        } else if (colors.length > 0) {
            return colors[0];
        }
        return 'black';
    },
    // }}}

    handleChange: function(values) {
        this.setState({ values });
    }
});

return <Options />;
