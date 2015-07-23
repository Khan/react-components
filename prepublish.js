'use strict';

var fs = require('fs');
var visitors = require('react-tools/vendor/fbtransform/visitors');
var jstransform = require('jstransform');

var visitorList = visitors.getAllVisitors();

var getJsName = function(filename) {
    var dot = filename.lastIndexOf(".");
    var baseName = filename.substring(0, dot);
    return baseName + ".js";
}

// perform es6 / jsx tranforms on all files and simultaneously copy them to the
// top level.
var files = fs.readdirSync('js');
for (var i = 0; i < files.length; i++) {
    var src = 'js/' + files[i];
    var dest = getJsName(files[i]);

    var js = fs.readFileSync(src, {encoding: 'utf8'});
    var transformed = jstransform.transform(visitorList, js).code;
    transformed = transformed.replace('.jsx', '.js');

    fs.writeFileSync(dest, transformed);
}
