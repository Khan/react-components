'use strict';

const jsdom = require("jsdom");
// const assert = require("assert");
const React = require("react");
const TestUtils = require("react-addons-test-utils");

const WindowDrag = require('../js/window-drag.jsx');

describe('WindowDrag', function() {
    /* eslint-disable no-undef */
    beforeEach(function() {
    /* eslint-enable no-undef */
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;

        const WindowNotifier = React.createClass({
            propTypes: {
                didMount: React.PropTypes.func,
                willUnmount: React.PropTypes.func,
            },
            componentDidMount: function() {
                this.props.didMount();
            },
            componentWillUnmount: function() {
                this.props.willUnmount();
            },
            render: function() {
                return <div />;
            },
        });

        this.activeDrag = false;

        this.elem = TestUtils.renderIntoDocument(
            <WindowDrag>
                <WindowNotifier
                    didMount={() => { this.activeDrag = true; }}
                    willUnmount={() => { this.activeDrag = false; }}
                />
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
