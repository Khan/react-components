var fs = require("fs");

var katexA11y = require("../js/katex-a11y");

var data = fs.readFileSync("khan-math.txt", {encoding: "utf8"}).split("\n");

var errors = {}

data.forEach(function(math) {
    try {
        // Attempt to parse math normally
        katexA11y.parseMath(math);

        try {
            var results = katexA11y.renderString(math);

        } catch(e) {
            console.log(math);
            console.error(e);

            var errStr = e.toString();

            if (!(errStr in errors)) {
                errors[errStr] = 0;
            }

            errors[errStr] += 1;
        }

    } catch(e) {
        // Everything is ok - since the math isn't parsing as normal!
    }
});

console.log(JSON.stringify(errors, null, "    "));