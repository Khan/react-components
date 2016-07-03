'use strict';

const jsdom = require("jsdom");
// const assert = require("assert");
const React = require("react");
const TestUtils = require("react-addons-test-utils");

const Modal = require('../js/modal.jsx');

describe('Modal', function() {
    /* eslint-disable no-undef */
    beforeEach(function() {
    /* eslint-enable no-undef */
        global.window = jsdom.jsdom().createWindow();
        global.document = window.document;

        // TODO(joel) there's probably a way to do this automatically with
        // sinon
        this.callsToClose = 0;
        const closeCalled = () => { this.callsToClose += 1; };

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
