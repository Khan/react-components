var React = require('react');
var BackboneMixin = require('./js/backbone-mixin.jsx');

// PRELUDE
var Comment = React.createClass({
    mixins: [BackboneMixin],
    getBackboneModels: function() {
        return [this.props.model];
    },
    render: function() { }
});
// POSTSCRIPT
