/* global beforeEach */

const jsdom = require("jsdom");
const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");
const TestUtils = require("react-addons-test-utils");
const BlurInput = require("../js/blur-input.jsx");

describe("BlurInput", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;

        this.value = "starting value";
        const handleChange = (newValue) => {
            this.value = newValue;
        };

        this.blurInput = TestUtils.renderIntoDocument(
            <BlurInput
                value={this.value}
                onChange={handleChange}
            />
        );
    });

    it("does not call onChange if there is no `blur`", function() {
        TestUtils.Simulate.change(ReactDOM.findDOMNode(this.blurInput),
                                  {target: {value: "new value"}});

        assert.strictEqual(this.value, "starting value");
    });

    it("calls onChange if there is a `blur`", function() {
        TestUtils.Simulate.change(ReactDOM.findDOMNode(this.blurInput),
                                  {target: {value: "new value"}});
        TestUtils.Simulate.blur(ReactDOM.findDOMNode(this.blurInput));

        assert.strictEqual(this.value, "new value");
    });
});
