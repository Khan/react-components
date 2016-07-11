/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-unused-vars, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react");
var TestUtils = require("react-addons-test-utils");

var Modal = require('../js/modal.jsx');

describe('Modal', function() {
    beforeEach(function() {
        global.window = jsdom.jsdom().createWindow();
        global.document = window.document;

        // TODO(joel) there's probably a way to do this automatically with
        // sinon
        this.callsToClose = 0;
        var closeCalled = () => {
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
