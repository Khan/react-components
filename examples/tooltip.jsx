// {{{
var pStyle = {
    margin: 0,
    padding: 10,
    backgroundColor: "white"
};
// }}}

return <Tooltip className="class-for-tooltip-contents"
                horizontalPosition="left"
                horizontalAlign="left"
                verticalPosition="bottom"
                arrowSize={10}
                borderColor="#ccc"
                show>
    <div>reticulating splines!</div>
    <p style={pStyle}>
        <a href="http://sims.wikia.com/wiki/Reticulating_splines">meaningless phrase</a>
    </p>
</Tooltip>;
