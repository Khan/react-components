var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react/addons");
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
        TestUtils.Simulate.dragEnter(this.dragTarget.getDOMNode());
        assert.strictEqual(this.dragTarget.state.dragHover, true);

        TestUtils.Simulate.dragLeave(this.dragTarget.getDOMNode());
        assert.strictEqual(this.dragTarget.state.dragHover, false);

        this.shouldDragHighlight = false;
        TestUtils.Simulate.dragEnter(this.dragTarget.getDOMNode());
        assert.strictEqual(this.dragTarget.state.dragHover, false);
    });

    it('accepts drops', function() {
        TestUtils.Simulate.dragOver(this.dragTarget.getDOMNode());
        var dataTransfer = {};
        TestUtils.Simulate.drop(this.dragTarget.getDOMNode(),
            { dataTransfer });
        assert.strictEqual(this.dataTransfer, dataTransfer);
    });
});
