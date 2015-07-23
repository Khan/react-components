var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var ButtonGroup = require("../js/button-group.jsx");

describe("ButtonGroup", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        this.value = 'starting';
        this.handleChange = (value) => {
            this.value = value;
        };
    });

    describe("allowEmpty = false", function() {
        beforeEach(function() {
            this.buttonGroup = TestUtils.renderIntoDocument(
               <ButtonGroup
                   value={this.value}
                   buttons={[
                       {value: 'starting', text: 'Starting Selection'},
                       {value: 'alternate', text: 'Alternate Selection'}
                   ]}
                   allowEmpty={false}
                   onChange={this.handleChange} />
            );
        });

        it("changes when a button is clicked", function() {
            var alternateButton = this.buttonGroup.refs.button1.getDOMNode();
            TestUtils.Simulate.click(alternateButton);
            assert.strictEqual(this.value, 'alternate');
        });

        it("stays selected when clicking on the selected item", function() {
            var startingButton = this.buttonGroup.refs.button0.getDOMNode();
            TestUtils.Simulate.click(startingButton);
            assert.strictEqual(this.value, 'starting');
        });
    });

    describe("allowEmpty = true", function() {
        beforeEach(function() {
            this.buttonGroup = TestUtils.renderIntoDocument(
               <ButtonGroup
                   value={this.value}
                   buttons={[
                       {value: 'starting', text: 'Starting Selection'},
                       {value: 'alternate', text: 'Alternate Selection'}
                   ]}
                   onChange={this.handleChange}
                   allowEmpty={true} />
            );
        });

        it("deselects when clicking on the selected item", function() {
            var startingButton = this.buttonGroup.refs.button0.getDOMNode();
            TestUtils.Simulate.click(startingButton);
            assert.strictEqual(this.value, null);
        });
    });
});
