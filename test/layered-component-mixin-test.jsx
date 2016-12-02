/* global beforeEach */

const assert = require("assert");
const jsdom = require("jsdom");
const React = require("react");
const TestUtils = require("react-addons-test-utils");

const LayeredComponentMixin = require("../js/layered-component-mixin.jsx");


describe("LayeredComponentMixin", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;
    });

    it("should render the layer outside of the render area", function() {
        const Layer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                return <div className="layer">This is the layer</div>;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            },
        });

        const layer = TestUtils.renderIntoDocument(<Layer />);

        const layerChildren = TestUtils.scryRenderedDOMComponentsWithClass(
            layer, "layer");
        const nonlayerChildren = TestUtils.scryRenderedDOMComponentsWithClass(
            layer, "not-layer");
        assert.strictEqual(layerChildren.length, 0);
        assert.strictEqual(nonlayerChildren.length, 1);
    });

    it("should render the layer in a div", function() {
        const Layer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                return <div className="layer">This is the layer</div>;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            },
        });

        TestUtils.renderIntoDocument(<Layer />);

        const layerDOMs = document.getElementsByClassName("layer");
        assert.strictEqual(layerDOMs.length, 1);

        const layerDOM = layerDOMs[0];
        const parent = layerDOM.parentNode;
        assert.strictEqual(parent.tagName, "DIV");

        const grandparent = parent.parentNode;
        assert.strictEqual(grandparent, document.body);
    });

    it("should allow empty layers", function() {
        const EmptyLayer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                // An empty layer
                return null;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            },
        });

        assert.doesNotThrow(function() {
            TestUtils.renderIntoDocument(<EmptyLayer />);
        });
    });
});
