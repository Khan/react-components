/* global beforeEach */

const jsdom = require("jsdom");
const React = require("react");
const TestUtils = require("react-dom/test-utils");
const createReactClass = require("create-react-class");
const PropTypes = require("prop-types");

const WindowDrag = require('../js/window-drag.jsx');

describe('WindowDrag', function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;

        const WindowNotifier = createReactClass({
            propTypes: {
                didMount: PropTypes.func.isRequired,
                willUnmount: PropTypes.func.isRequired,
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
                    didMount={() => {
                        this.activeDrag = true;
                    }}
                    willUnmount={() => {
                        this.activeDrag = false;
                    }}
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
