'use strict';

const fs = require('fs');
const ReactTools = require("react-tools");

require.extensions['.jsx'] = function(module, filename) {
    let content;
    content = fs.readFileSync(filename, 'utf8');
    const compiled = ReactTools.transform(content, {harmony: true});
    return module._compile(compiled, filename);
};
