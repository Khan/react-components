/* global CodeMirror */

// BackboneMixin example needs Backbone
window.Backbone = require('backbone');
const React = require('react');
const ReactDOM = require("react-dom");
const ReactPlayground = require('./react-live-editor/live-editor.jsx');

// Bring all these into scope
window.$_                     = require("./js/i18n.jsx");
window.BackboneMixin          = require("./js/backbone-mixin.jsx");
window.BlurInput              = require("./js/blur-input.jsx");
window.ButtonGroup            = require("./js/button-group.jsx");
window.MultiButtonGroup       = require("./js/multi-button-group.jsx");
window.DragTarget             = require("./js/drag-target.jsx");
window.InfoTip                = require("./js/info-tip.jsx");
window.LayeredComponentMixin  = require("./js/layered-component-mixin.jsx");
window.Modal                  = require("./js/modal.jsx");
window.SetIntervalMixin       = require("./js/set-interval-mixin.jsx");
window.Sortable               = require("./js/sortable.jsx");
window.TeX                    = require("./js/tex.jsx");
window.TimeAgo                = require("./js/timeago.jsx");
window.TimeoutTransitionGroup = require("./js/timeout-transition-group.jsx");
window.Tooltip                = require("./js/tooltip.jsx");
window.WindowDrag             = require("./js/window-drag.jsx");

// Create a <ReactPlayground> for each example.
const examples = document.querySelectorAll('div.example_div');

for (let i = 0; i < examples.length; i++) {
    const elem = examples[i];
    ReactDOM.render(
        <ReactPlayground codeText={elem.textContent} />,
        elem
    );
}

// Highlight all of the other code snippets. Each code snippet is in a textarea
// (TODO(joel) - don't use a textarea?) with two classes - "code <language>".
const codes = document.querySelectorAll('textarea.code');

for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const classes = code.classList;

    // Remove code so the only remaining class is the name of the highlight
    // language.
    classes.remove('code');

    CodeMirror.fromTextArea(code, {
        mode: classes.item(0),
        lineNumbers: false,
        readOnly: code.getAttribute("readonly") != null,
    });
}
