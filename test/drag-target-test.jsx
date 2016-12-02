/* global beforeEach */

const jsdom = require("jsdom");
const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");

const DragTarget = require('../js/drag-target.jsx');

describe('DragTarget', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;

        this.dataTransfer = null;
        this.shouldDragHighlight = true;

        const handleDrop = event => {
            this.dataTransfer = event.dataTransfer;
        };

        this.dragTarget = TestUtils.renderIntoDocument(
            <DragTarget onDrop={handleDrop}
                shouldDragHighlight={() => this.shouldDragHighlight}
            >
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
        const dataTransfer = {};
        TestUtils.Simulate.drop(ReactDOM.findDOMNode(this.dragTarget),
            {dataTransfer});
        assert.strictEqual(this.dataTransfer, dataTransfer);
    });
});
