/** @jsx React.DOM */

var React = require('react');
var ReactPlayground = require('./react-live-editor/live-editor.jsx');

// Bring all these into scope
window.BackboneMixin = require("./js/backbone-mixin.jsx");
window.BlurInput = require("./js/blur-input.jsx");
window.ButtonGroup = require("./js/button-group.jsx");
window.$_ = require("./js/i18n.jsx");
window.InfoTip = require("./js/info-tip.jsx");
window.LayeredComponentMixin = require("./js/layered-component-mixin.jsx");
window.SetIntervalMixin = require("./js/set-interval-mixin.jsx");
window.Sortable = require("./js/sortable.jsx");
window.TeX = require("./js/tex.jsx");
window.TimeAgo = require("./js/timeago.jsx");
window.Tooltip = require("./js/tooltip.jsx");

var examples = document.querySelectorAll('div.example_div');

for (var i = 0; i < examples.length; i++) {
    var elem = examples[i];
    React.renderComponent(
        ReactPlayground({codeText: elem.textContent}),
        elem
    );
}
