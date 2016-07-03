'use strict';

const jsdom = require("jsdom");
// const assert = require("assert");
// const React = require("react");
// const TestUtils = require("react-addons-test-utils");
// const StateFromStoreMixin = require("../js/state-from-store-mixin.jsx");

describe("StateFromStoreMixin", function() {
    /* eslint-disable no-undef */
    beforeEach(function() {
    /* eslint-enable no-undef */
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
