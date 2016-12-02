const fs = require("fs");
const assert = require("assert");

const katexA11y = require("../js/katex-a11y");

describe("a11y math", function() {
    let data;

    before(function() {
        const testFile = __dirname + "/katex-a11y-math.txt";
        data = fs.readFileSync(testFile, {encoding: "utf8"}).split("\n");
    });

    it("parses all math", function() {
        data.forEach(function(math) {
            try {
                katexA11y.renderString(math);

                // Successfully rendered a string
                assert(true, math);
            } catch (e) {
                // Hit something that was unknown - this is bad!
                assert(false, math + " " + e);
            }
        });
    });
});

describe("a11y tex", function() {
    let tests;

    before(function() {
        tests = require("./katex-a11y-tex.json");
    });

    it("generates the correct strings", function() {
        tests.forEach(function(math) {
            const output = katexA11y.renderString(math.input);
            assert.equal(output, math.output, "Parsing " + math.input);
        });
    });
});
