'use strict';

const fs = require('fs');
const visitors = require('react-tools/vendor/fbtransform/visitors');
const jstransform = require('jstransform');

const visitorList = visitors.getAllVisitors();

const getJsName = function(filename) {
    const dot = filename.lastIndexOf(".");
    const baseName = filename.substring(0, dot);
    return baseName + ".js";
};

// perform es6 / jsx tranforms on all files and simultaneously copy them to the
// top level.
const files = fs.readdirSync('js');
for (let i = 0; i < files.length; i++) {
    const src = 'js/' + files[i];
    const dest = getJsName(files[i]);

    const js = fs.readFileSync(src, {encoding: 'utf8'});
    let transformed = jstransform.transform(visitorList, js).code;
    transformed = transformed.replace('.jsx', '.js');

    fs.writeFileSync(dest, transformed);
}
