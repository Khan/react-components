/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-var, react/jsx-closing-bracket-location */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var BlurInput = require("../js/blur-input.jsx");

describe("BlurInput", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        this.value = "starting value";
        var handleChange = (newValue) => {
            this.value = newValue;
        };

        this.blurInput = TestUtils.renderIntoDocument(
           <BlurInput
               value={this.value}
               onChange={handleChange} />
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
