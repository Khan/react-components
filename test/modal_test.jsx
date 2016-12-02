/* global beforeEach */

const jsdom = require("jsdom");
const React = require("react");
const TestUtils = require("react-addons-test-utils");

const Modal = require('../js/modal.jsx');

describe('Modal', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;

        // TODO(joel) there's probably a way to do this automatically with
        // sinon
        this.callsToClose = 0;
        const closeCalled = () => {
            this.callsToClose += 1;
        };

        this.modal = TestUtils.renderIntoDocument(
            <Modal onClose={closeCalled}>
                modal contents!
            </Modal>
        );
    });

    /* TODO(joel) figure out why this doesn't work.
    it('closes when you press "esc"', function() {
        TestUtils.Simulate.keyPress(window, {key: "Escape"});
        assert.strictEqual(this.callsToClose, 1);
    });
    */
});
