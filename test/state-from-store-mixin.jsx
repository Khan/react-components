/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-unused-vars, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

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
