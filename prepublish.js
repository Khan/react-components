'use strict';

var fs = require('fs');

var files = fs.readdirSync('js');
for (var i = 0; i < files.length; i++) {
    var file = files[i];
    fs.renameSync('js/' + file, file);
}
