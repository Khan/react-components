/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-var, react/jsx-closing-bracket-location, react/jsx-indent-props */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");

var DragTarget = require('../js/drag-target.jsx');

describe('DragTarget', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        this.dataTransfer = null;
        this.shouldDragHighlight = true;

        var handleDrop = event => {
            this.dataTransfer = event.dataTransfer;
        };

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
            {dataTransfer});
        assert.strictEqual(this.dataTransfer, dataTransfer);
    });
});
