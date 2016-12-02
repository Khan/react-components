/* WARNING - DEPRECATED
 *
 * We recommend that you don't use this mixin. It's not idiomatic react and
 * leads to inefficient and janky code. It's almost impossible to recover good
 * performance with this component. It's also invasive - hard to remove after
 * it's invaded your code.
 */

/**
 * BackboneMixin - automatic binding and unbinding for react classes mirroring
 * backbone models and views. Example:
 *
 *     const Model = Backbone.Model.extend({ ... });
 *     const Collection = Backbone.Collection.extend({ ... });
 *
 *     const Example = React.createClass({
 *         mixins: [BackboneMixin],
 *         getBackboneModels: function() {
 *             return [this.model, this.collection];
 *         }
 *     });
 *
 * List the models and collections that your class uses and it'll be
 * automatically `forceUpdate`-ed when they change.
 *
 * This binds *and* unbinds the events.
 */
const BackboneMixin = {
    componentDidMount: function() {
        this._backboneModels = this.getBackboneModels();
        this._validateModelArray(this._backboneModels);

        this._bind(this._backboneModels);
    },

    componentWillUnmount: function() {
        this._unbind(this._backboneModels);
    },

    // The backbone models may have changed - rebind to the new ones
    componentDidUpdate: function(nextProps, nextState) {
        const previousModels = this._backboneModels;
        const currentModels = this._backboneModels = this.getBackboneModels();

        const oldModels = [];
        const newModels = [];

        for (const model of previousModels) {
            if (currentModels.indexOf(model) < 0) {
                oldModels.push(model);
            }
        }

        for (const model of currentModels) {
            if (previousModels.indexOf(model) < 0) {
                newModels.push(model);
            }
        }

        this._unbind(oldModels);
        this._bind(newModels);
    },

    _bind: function(models) {
        models.map(function(model) {
            model.on("add change remove reset", this._backboneForceUpdate,
                this);
        }.bind(this));
    },

    _unbind: function(models) {
        models.map(function(model) {
            model.off("add change remove reset", this._backboneForceUpdate,
                this);
        }.bind(this));
    },

    _backboneForceUpdate: function() {
        // TODO(joel): more rigorous fix needed? -- for the following error:
        // "Invariant Violation: forceUpdate(...): Can only force an update on
        // mounted or mounting components."
        if (this.isMounted()) {
            this.forceUpdate();
        }
    },

    _validateModelArray: function(backboneModels) {
        if (!Array.isArray(backboneModels)) {
            throw new Error("getBackboneModels must return an array. " +
                "get this " + backboneModels + " out of here.");
        }
    },
};

module.exports = BackboneMixin;
