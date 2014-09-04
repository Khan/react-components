require("./object-assign-polyfill.js");

// React determines if it can depend on the DOM at require-time, so if we don't
// set this up beforehand it will complain about not being able to do things
// with the DOM.
// Perhaps a bug in React?
var jsdom = require("jsdom");

global.window = jsdom.jsdom().createWindow('<html><body></body></html>');
global.document = window.document;
global.navigator = window.navigator;
