var React = require("react");
var assert = require("assert");
var _ = require("underscore");

var $_ = require("../js/i18n.jsx");

var maybeJoin = function(renderable) {
    // lolol
    var markup = React.renderToStaticMarkup(React.DOM.div(null, renderable));
    assert.equal(markup.slice(0, 5), "<div>");
    assert.equal(markup.slice(-6), "</div>");
    return markup.slice(5, -6);
};

describe("i18n", function() {
    it("returns an array of just the string when no args", function() {
        assert.deepEqual(maybeJoin($_(null, "Khan Academy")), "Khan Academy");
    });

    it("returns an array representing the string", function() {
        assert.deepEqual(
            maybeJoin(
                $_(
                    {who: "anyone anywhere"},
                    "A free world-class education for %(who)s."
                )
            ),
            "A free world-class education for anyone anywhere."
        );
    });
});
