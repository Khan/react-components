var assert = require("assert");
var jsdom = require("jsdom");
var React = require("react");
var TestUtils = React.addons.TestUtils;

var LayeredComponentMixin = require("../js/layered-component-mixin.jsx");


describe("LayeredComponentMixin", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.parentWindow;
    });

    it("should render the layer outside of the render area", function() {
        var Layer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                return <div className="layer">This is the layer</div>;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            }
        });

        var layer = TestUtils.renderIntoDocument(<Layer />);

        var layerChildren = TestUtils.scryRenderedDOMComponentsWithClass(
            layer, "layer");
        var nonlayerChildren = TestUtils.scryRenderedDOMComponentsWithClass(
            layer, "not-layer");
        assert.strictEqual(layerChildren.length, 0);
        assert.strictEqual(nonlayerChildren.length, 1);
    });

    it("should render the layer in a div attached to the document body",
            function() {
        var Layer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                return <div className="layer">This is the layer</div>;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            }
        });

        var layer = TestUtils.renderIntoDocument(<Layer />);

        var layerDOMs = document.getElementsByClassName("layer");
        assert.strictEqual(layerDOMs.length, 1);

        var layerDOM = layerDOMs[0];
        var parent = layerDOM.parentNode;
        assert.strictEqual(parent.tagName, "DIV");

        var grandparent = parent.parentNode;
        assert.strictEqual(grandparent, document.body);
    });

    it("should allow empty layers", function() {
        var EmptyLayer = React.createClass({
            mixins: [LayeredComponentMixin],

            renderLayer: function() {
                // An empty layer
                return null;
            },

            render: function() {
                return <div className="not-layer">This is not a layer</div>;
            }
        });

        assert.doesNotThrow(function() {
            TestUtils.renderIntoDocument(<EmptyLayer />);
        });
    });
});
