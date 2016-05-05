/* TODO(emily): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable indent, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var fs = require('fs');
var ReactTools = require("react-tools");
require.extensions['.jsx'] = function(module, filename) {
  var content;
  content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});
  return module._compile(compiled, filename);
};
