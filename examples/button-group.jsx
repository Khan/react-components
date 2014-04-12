var Options = React.createClass({
    render: function() {
        return <div>
            Options
            <ButtonGroup value='1'
                         buttons={[
                            {value: '1', text: '1'},
                            {value: '2', text: '2'},
                            {value: '3', text: '3'}
                         ]}
                         onChange={() => {}} />
        </div>;
    }
});
