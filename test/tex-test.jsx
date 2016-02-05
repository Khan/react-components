const assert = require("assert");
const React = require("react");
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
});
