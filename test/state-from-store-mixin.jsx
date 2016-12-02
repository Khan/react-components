/* global beforeEach */

const jsdom = require("jsdom");

describe("StateFromStoreMixin", function() {
    beforeEach(function() {
        global.document = jsdom.jsdom();
        global.window = document.defaultView;
    });

    describe("fetch", function() {
        // TODO(joel/zach)
    });

    describe("getFetchParams", function() {
        // TODO(joel/zach)
    });
});
