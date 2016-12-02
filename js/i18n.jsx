/**
 * Performs sprintf-like %(name)s replacement on str, and returns a React
 * fragment of the string interleaved with those replacements. The replacements
 * can be any valid React node including strings and numbers.
 *
 * For example:
 *  interpolateStringToFragment("test", {}) ->
 *      test
 *  interpolateStringToFragment("test %(num)s", {num: 5}) ->
 *      test 5
 *  interpolateStringToFragment("test %(num)s", {num: <Count />}) ->
 *      test <Count />
 */

const createFragment = require('react-addons-create-fragment');

const interpolationMarker = /%\(([\w_]+)\)s/g;

const interpolateStringToFragment = function(str, options) {
    options = options || {};

    // Split the string into its language fragments and substitutions
    const split = str.split(interpolationMarker);

    const result = {"text_0": split[0]};

    // Replace the substitutions with the appropriate option
    for (let i = 1; i < split.length; i += 2) {
        const key = split[i];
        let replaceWith = options[key];
        if (replaceWith === undefined) {
            replaceWith = "%(" + key + ")s";
        }

        // We prefix each substitution key with a number that increments each
        // time it's used, so "test %(num)s %(fruit)s and %(num)s again" turns
        // into an object with keys:
        // [text_0, 0_num, text_2, 0_fruit, text_4, 1_num, text_6]
        // This is better than just using the array index in the case that we
        // switch between two translated strings with the same variables.
        // Admittedly, an edge case.
        let j = 0;
        while (result.hasOwnProperty(j + "_" + key)) {
            j++;
        }
        result[j + "_" + key] = replaceWith;
        // Because the regex has one capturing group, the `split` array always
        // has an odd number of elements, so this always stays in bounds.
        result["text_" + (i + 1)] = split[i + 1];
    }

    return createFragment(result);
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
const $_ = function(options, str) {
    if (arguments.length !== 2 || typeof str !== "string") {
        return "<$_> must have exactly one child, which must be a string";
    }
    return interpolateStringToFragment(str, options);
};

module.exports = $_;
