/* globals beforeEach, afterEach */
const assert = require("assert");
const jsdom = require("jsdom");
const React = require("react");
const ReactDOM = require("react-dom");
const ReactDOMServer = require("react-dom/server");
const TeX = require("../js/tex.jsx");

describe("TeX", () => {
    it("generates HTML when server-side rendered", () => {
        const html = ReactDOMServer.renderToString(<TeX>q</TeX>);

        assert(html.indexOf('<span class="katex">') !== -1);
        assert(html.indexOf('aria-hidden="true"') !== -1);
        assert(html.indexOf('q') !== -1);
    });

    it("doesn't hide the KaTeX when it fails to generate a11y text", () => {
        const html = ReactDOMServer.renderToString(<TeX>\forall x</TeX>);

        assert(html.indexOf('<span class="katex">') !== -1);
        assert(html.indexOf('aria-hidden="false"') !== -1);
        assert(html.indexOf('∀') !== -1);
    });

    it("renders but doesn't show anything if the KaTeX fails", () => {
        // NOTE(emily): As of writing, KaTeX doesn't support comments. If it
        // ever does, this test will break.
        const html = ReactDOMServer.renderToString(<TeX>q%</TeX>);

        assert(html.indexOf('<span class="katex">') === -1);
        assert(html.indexOf('q') === -1);
    });

    describe("MathJax", () => {
        beforeEach(function() {
            global.document = jsdom.jsdom();
            global.window = document.parentWindow;
        });

        afterEach(function() {
            global.MathJax = undefined;
            global.Khan = undefined;
        });

        it("waits for MathJax to load before rendering", done => {
            const elem = document.createElement("div");

            const callbacks = [];
            global.Khan = {
                mathJaxLoaded: {
                    then: (callback) => callbacks.push(callback),
                },
            };

            // Force rendering of MathJax by using a comment.
            // NOTE(emily): As of writing, KaTeX doesn't support comments. If
            // it ever does, this test will break.
            ReactDOM.render(<TeX>q%</TeX>, elem, function() {
                // MathJax processes on the next tick.
                setTimeout(() => {
                    // Make sure that KaTeX didn't render.
                    assert.equal(
                        elem.innerHTML.indexOf('<span class="katex">'), -1);

                    // Make sure that a MathJax callback was registered.
                    assert.equal(callbacks.length, 1);

                    // Set up a fake MathJax
                    global.MathJax = {
                        Hub: {
                            // Make the queue just a passthrough.
                            Queue: f => f(),

                            // Make sure we actually get to a Process call.
                            Process: () => {
                                done();
                            },
                        },
                    };

                    // Call the callback, which should cause a render to
                    // happen.
                    callbacks[0]();
                }, 0);
            });
        });
    });
});
