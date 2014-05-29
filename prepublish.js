'use strict';

var fs = require('fs');
var visitors = require('react-tools/vendor/fbtransform/visitors');
var jstransformer = require('jstransform');

var visitorList = visitors.getAllVisitors();

// perform es6 / jsx tranforms on all files and simultaneously copy them to the
// top level.
var files = fs.readdirSync('js');
for (var i = 0; i < files.length; i++) {
    var filename = files[i];

    var js = fs.readFileSync('js/' + filename);
    var transformed = jstransform.transform(visitorList, js).code;

    fs.writeFileSync(filename, transformed);
}
