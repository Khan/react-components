"use strict";

// React determines if it can depend on the DOM at require-time, so if we don't
// set this up beforehand it will complain about not being able to do things
// with the DOM.
// Perhaps a bug in React?
const jsdom = require("jsdom");

global.document = jsdom.jsdom();
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};

// KaTeX complains and doesn't work unless we set the compatMode to something
// reasonable.
Object.defineProperty(global.document, "compatMode", {
    get: function() {
        return "CSS1Compat";
    },
});

// Bring in katex for the katex-specific tests
global.katex = require("../docs/js/katex");
