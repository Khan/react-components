/** @jsx React.DOM */

var React = require('react');
var ReactPlayground = require('./react-live-editor/live-editor.jsx');

// BackboneMixin example needs Backbone
window.Backbone = require('backbone');

// Bring all these into scope
window.$_                    = require("./js/i18n.jsx");
window.BackboneMixin         = require("./js/backbone-mixin.jsx");
window.BlurInput             = require("./js/blur-input.jsx");
window.ButtonGroup           = require("./js/button-group.jsx");
window.DragTarget            = require("./js/drag-target.jsx");
window.InfoTip               = require("./js/info-tip.jsx");
window.LayeredComponentMixin = require("./js/layered-component-mixin.jsx");
window.SetIntervalMixin      = require("./js/set-interval-mixin.jsx");
window.Sortable              = require("./js/sortable.jsx");
window.TeX                   = require("./js/tex.jsx");
window.TimeAgo               = require("./js/timeago.jsx");
window.Tooltip               = require("./js/tooltip.jsx");

// Create a <ReactPlayground> for each example.
var examples = document.querySelectorAll('div.example_div');

for (var i = 0; i < examples.length; i++) {
    var elem = examples[i];
    React.renderComponent(
        ReactPlayground({codeText: elem.textContent}),
        elem
    );
}

// Highlight all of the other code snippets. Each code snippet is in a textarea
// (TODO(joel) - don't use a textarea?) with two classes - "code <language>".
var codes = document.querySelectorAll('textarea.code');

for (var i = 0; i < codes.length; i++) {
    var code = codes[i];
    var classes = code.classList;

    // Remove code so the only remaining class is the name of the highlight
    // language.
    classes.remove('code');

    CodeMirror.fromTextArea(code, {
        mode: classes.item(0),
        lineNumbers: false
    });
}
