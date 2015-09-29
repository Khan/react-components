var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react/addons");
var ReactDOM = require("react-dom");
var TestUtils = React.addons.TestUtils;

var DragTarget = require('../js/drag-target.jsx');

describe('DragTarget', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        this.dataTransfer = null;
        this.shouldDragHighlight = true;

        var handleDrop = event => { this.dataTransfer = event.dataTransfer; };

        this.dragTarget = TestUtils.renderIntoDocument(
            <DragTarget onDrop={handleDrop}
                        shouldDragHighlight={() => this.shouldDragHighlight}>
                <div />
            </DragTarget>
        );
    });

    it('shows hover at the appropriate times', function() {
        TestUtils.Simulate.dragEnter(ReactDOM.findDOMNode(this.dragTarget));
        assert.strictEqual(this.dragTarget.state.dragHover, true);

        TestUtils.Simulate.dragLeave(ReactDOM.findDOMNode(this.dragTarget));
        assert.strictEqual(this.dragTarget.state.dragHover, false);

        this.shouldDragHighlight = false;
        TestUtils.Simulate.dragEnter(ReactDOM.findDOMNode(this.dragTarget));
        assert.strictEqual(this.dragTarget.state.dragHover, false);
    });

    it('accepts drops', function() {
        TestUtils.Simulate.dragOver(ReactDOM.findDOMNode(this.dragTarget));
        var dataTransfer = {};
        TestUtils.Simulate.drop(ReactDOM.findDOMNode(this.dragTarget),
            { dataTransfer });
        assert.strictEqual(this.dataTransfer, dataTransfer);
    });
});
