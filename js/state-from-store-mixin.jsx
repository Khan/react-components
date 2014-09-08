/**
 * A React mixin factory which syncs state with a flux-style datastore. In
 * order to be compatible with this mixin, the datastore must support the
 * addition and removal of change event handlers via `addChangeListener` and
 * `removeChangeListener` respectively.
 *
 * fetchParams a derived projection of the props which are required to get the
 * state from the datastore.
 *
 * The StateFromStore factory function takes a dictionary of stateDescriptors,
 * which are objects with the following 3 properties:
 *
 * store: a Datastore, which must support adding and removing change event
 * handlers
 *
 * getFetchParams: a function which takes props and returns the data required
 * to fetch the desired state from the store (or null, if no such data is
 * required). (This is used for caching -- if the fetchParams do not change
 * based on prop changes, no fetch will be done).
 *
 * fetch: a function which takes the datastore and fetchParams (returned from
 * the corresponding getFetchParams function), and which returns the new state
 * value.
 *
 *
 * Example for a component which sets its state.userMission from a
 * UserMissionStore:
 *
 * mixins = [StateFromStore({
 *     userMission: {
 *         store: UserMissionStore,
 *         getFetchParams: function(props) {
 *             return {missionSlug: props.missionSlug};
 *         },
 *         fetch: function(store, fetchParams) {
 *             store.getBySlug(fetchParams.missionSlug);
 *         }
 *     }
 * })];
 */

var _ = require("underscore");

//TODO(zach): unit test me

var StateFromStore = function(stateDescriptors) {
    var storageKey = _.uniqueId("StateFromStoreMixin");

    var setState = function(component, stateKey, stateData) {
        var newState = {};
        newState[stateKey] = stateData;
        component.setState(newState);
    };

    /**
     * Fetch the new state data using the fetch method included in
     * stateDescriptors. If useCache is true, no fetch will occur if
     * fetchParams has not changed since the last fetch. If no fetch occurs,
     * didFetch will be false in the return value.
     *
     * @param {Object} component the react component
     * @param {string} stateKey the key which we are fetching
     * @param {bool} useCache should we use the fetchParamsCache to guard
     * against unnecessary fetches?
     * @param {Object} [props] the props to use for fetchParams. If not
     * specified, use the component's current props
     *
     * @returns {{stateData, didFetch:bool}} the state data, along with whether
     * an actual fetch occurred
     */
    var fetchNewStateData = function(component, stateKey, useCache, props) {
        props = props || component.props;

        var fetchParamsCache = component[storageKey].fetchParamsCache;

        var stateDescriptor = stateDescriptors[stateKey];
        var fetchParams = null;
        if (stateDescriptor.getFetchParams) {
            fetchParams = stateDescriptor.getFetchParams(props);
        }

        if (useCache && _.isEqual(fetchParamsCache[stateKey], fetchParams)) {
            // fetchParams haven't changed, we don't need to fetch
            return {stateData: null, didFetch: false};
        }

        fetchParamsCache[stateKey] = fetchParams;
        var stateData = stateDescriptor.fetch(stateDescriptor.store,
                                              fetchParams);

        return {stateData: stateData, didFetch: true};
    };

    var fetchForUpdate = function(component, stateKey) {
        var stateData = fetchNewStateData(
            component, stateKey, false).stateData;
        setState(component, stateKey, stateData);
    };

    var fetchForNewProps = function(component, stateKey, props) {
        // give destructuring plz
        var fetchData = fetchNewStateData(component, stateKey, true, props);
        if (fetchData.didFetch) {
            var stateData = fetchData.stateData;
            setState(component, stateKey, stateData);
        }
    };

    var addChangeListeners = function(component) {
        var changeListeners = component[storageKey].changeListeners;
        _.each(stateDescriptors, function(stateDescriptor, stateKey) {
            var handleChange = () => fetchForUpdate(component, stateKey);
            changeListeners[stateKey] = handleChange;
            stateDescriptor.store.addChangeListener(handleChange);
        });
    };

    var removeChangeListeners = function(component) {
        var changeListeners = component[storageKey].changeListeners;
        _.each(stateDescriptors, function(stateDescriptor, stateKey) {
            stateDescriptor.store.removeChangeListener(
                changeListeners[stateKey]);
            delete changeListeners[stateKey];
        });
    };

    var fetchAllForNewProps = function(component, props) {
        Object.keys(stateDescriptors).forEach(function(stateKey) {
            fetchForNewProps(component, stateKey, props);
        });
    };

    return {
        getInitialState: function() {
            this[storageKey] = {
                /* A dictionary from state keys to cached fetchParams */
                fetchParamsCache: {},

                /* A dictionary from state keys to change event handlers */
                changeListeners: {}
            };

            var initialState = {};
            Object.keys(stateDescriptors).forEach(function(stateKey) {
                var stateData = fetchNewStateData(
                    this, stateKey, false).stateData;
                initialState[stateKey] = stateData;
            }, this);
            return initialState;
        },

        componentDidMount: function() {
            addChangeListeners(this);
        },

        componentWillUnmount: function() {
            removeChangeListeners(this);
        },

        componentWillReceiveProps: function(nextProps) {
            fetchAllForNewProps(this, nextProps);
        }
    };
};

module.exports = StateFromStore;
