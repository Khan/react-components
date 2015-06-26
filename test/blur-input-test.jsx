var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
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
        TestUtils.Simulate.change(this.blurInput.getDOMNode(),
                                  {target: {value: "new value"}});

        assert.strictEqual(this.value, "starting value");
    });

    it("calls onChange if there is a `blur`", function() {
        TestUtils.Simulate.change(this.blurInput.getDOMNode(),
                                  {target: {value: "new value"}});
        TestUtils.Simulate.blur(this.blurInput.getDOMNode());

        assert.strictEqual(this.value, "new value");
    });
});
