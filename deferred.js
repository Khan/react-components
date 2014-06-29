var $ = require("jquery");

var UNMOUNTING = {};

/* If the component unmounts before the promise is resolved:
 * ~ the fullfill handler is not called
 * ~ the reject handler is called with PromiseMixin.UNMOUNTING
 * ~ we make no effort to cancel the promise
 */

var PromiseMixin = {
    defer: function(promise) {
        console.log("defer");
        var ret = $.Deferred();

        promise.then(
            function() { ret.resolveWith(this, [].slice.call(arguments)); },
            function() { ret.rejectWith(this, [].slice.call(arguments)); }
        );

        return ret.promise();
    },

    componentWillUnmount: function() {
        console.log("componentWillUnmount");
        this._deferreds.map(function(deferred)  {return deferred.reject(UNMOUNTING);});

        // TODO necessary?
        delete this._deferreds;
    },

    _deferreds: [],

    UNMOUNTING:UNMOUNTING
};

module.exports = PromiseMixin;
