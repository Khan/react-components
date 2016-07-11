/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-undef, no-unused-vars, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react");
var TestUtils = require("react-addons-test-utils");

var WindowDrag = require('../js/window-drag.jsx');

describe('WindowDrag', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        var WindowNotifier = React.createClass({
            render: function() {
                return <div />;
            },
            componentDidMount: function() {
                this.props.didMount();
            },
            componentWillUnmount: function() {
                this.props.willUnmount();
            }
        });

        this.activeDrag = false;

        this.elem = TestUtils.renderIntoDocument(
            <WindowDrag>
                <WindowNotifier
                    didMount={() => {
                        this.activeDrag = true;
                    }}
                    willUnmount={() => {
                        this.activeDrag = false;
                    }} />
            </WindowDrag>
        );
    });

    it('activates/disactivates based on window drags ', function() {
        // TODO(joel) - figure this out
        // TestUtils.Simulate.dragEnter(window);
        // assert.strictEqual(this.activeDrag, true);

        // TestUtils.Simulate.dragLeave(window);
        // assert.strictEqual(this.activeDrag, false);

        // TestUtils.Simulate.dragEnter(window);
        // assert.strictEqual(this.activeDrag, true);

        // TestUtils.Simulate.drop(window);
        // assert.strictEqual(this.activeDrag, false);
    });
});
