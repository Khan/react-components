var jsdom = require("jsdom");
var assert = require("assert");
var React = require("react");
var TestUtils = require("react-addons-test-utils");
var StateFromStoreMixin = require("../js/state-from-store-mixin.jsx");

describe("StateFromStoreMixin", function() {
    beforeEach(function() {
        global.window = jsdom.jsdom().createWindow();
        global.document = window.document;
    });

    describe("fetch", function() {
        // TODO(joel/zach)
    });

    describe("getFetchParams", function() {
        // TODO(joel/zach)
    });
});
