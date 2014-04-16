var _ = require('underscore');

/**
 * Performs sprintf-like %(name)s replacement on str, and returns an array of
 * the string interleaved with those replacements
 *
 * For example:
 *  interpolateStringToArray("test", {}) -> ["test"]
 *  interpolateStringToArray("test %(num)s", {num: 5}) -> ["test ", 5, ""]
 */
var interpolateStringToArray = function(str, options) {
    options = options || {};

    // Split the string into its language fragments and substitutions
    var split = str.split(/%\(([\w_]+)\)s/g);

    // Replace the substitutions with the appropriate option
    for (var i = 1; i < split.length; i += 2) {
        var replaceWith = options[split[i]];
        split[i] = _.isUndefined(replaceWith) ?
            "%(" + split[i] + ")s" :
            replaceWith;
    }
    return split;
};

/**
 * A simple i18n react component-like function to allow for string
 * interpolation destined for the output of a react render() function
 *
 * This function understands react components, or other things renderable by
 * react, passed in as props.
 *
 * Examples:
 *   <$_ first="Motoko" last="Kusanagi">
 *       Hello, %(first)s %(last)s!
 *   </$>
 *
 * which react/jsx compiles to:
 *   $_({first: "Motoko", last: "Kusanagi"}, "Hello, %(first)s %(last)s!")
 *
 *
 *   <$_ textbox={<input type="text" />}>
 *       Please enter a number: %(textbox)s
 *   </$_>
 *
 * which react/jsx compiles to:
 *   $_({textbox: React.DOM.input({type: "text"}),
 *       "Please enter a number: %(textbox)s")
 *
 * Note: this is not a full react component to avoid complex handling of other
 * things added to props, such as this.props.ref and this.props.children
 */
var $_ = function(options, str) {
    if (arguments.length !== 2 || !_.isString(str)) {
        return "<$_> must have exactly one child, which must be a string";
    }
    return interpolateStringToArray(str, options);
};

module.exports = $_;
