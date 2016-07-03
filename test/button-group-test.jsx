'use strict';

const jsdom = require("jsdom");
const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");
const ButtonGroup = require("../js/button-group.jsx");

describe("ButtonGroup", function() {
    /* eslint-disable no-undef */
    beforeEach(function() {
    /* eslint-enable no-undef */
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        this.value = 'starting';
        this.handleChange = (value) => {
            this.value = value;
        };
    });

    describe("allowEmpty = false", function() {
        /* eslint-disable no-undef */
        beforeEach(function() {
        /* eslint-enable no-undef */
            this.buttonGroup = TestUtils.renderIntoDocument(
               <ButtonGroup
                   value={this.value}
                   buttons={[
                       {value: 'starting', text: 'Starting Selection'},
                       {value: 'alternate', text: 'Alternate Selection'},
                   ]}
                   allowEmpty={false}
                   onChange={this.handleChange}
               />
            );
        });

        it("changes when a button is clicked", function() {
            const alternateButton =
                     ReactDOM.findDOMNode(this.buttonGroup.refs.button1);
            TestUtils.Simulate.click(alternateButton);
            assert.strictEqual(this.value, 'alternate');
        });

        it("stays selected when clicking on the selected item", function() {
            const startingButton =
                    ReactDOM.findDOMNode(this.buttonGroup.refs.button0);
            TestUtils.Simulate.click(startingButton);
            assert.strictEqual(this.value, 'starting');
        });
    });

    describe("allowEmpty = true", function() {
        /* eslint-disable no-undef */
        beforeEach(function() {
        /* eslint-enable no-undef */
            this.buttonGroup = TestUtils.renderIntoDocument(
               <ButtonGroup
                   value={this.value}
                   buttons={[
                       {value: 'starting', text: 'Starting Selection'},
                       {value: 'alternate', text: 'Alternate Selection'},
                   ]}
                   onChange={this.handleChange}
                   allowEmpty={true}
               />
            );
        });

        it("deselects when clicking on the selected item", function() {
            const startingButton =
                    ReactDOM.findDOMNode(this.buttonGroup.refs.button0);
            TestUtils.Simulate.click(startingButton);
            assert.strictEqual(this.value, null);
        });
    });
});
