'use strict';

var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var map = require('event-stream').map;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;


var plugin = function(opts){
    var hashDesc = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?([^\s>"']+?)['|"]/gi;

    return map(function (file, cb) {
        if (!file) {
            throw new PluginError('gulp-hash-append', 'Missing file option for gulp-hash-append.');
         }

         var content = file.contents.toString();
         var md5 = crypto.createHash('md5');
         md5.update(content, 'utf8');
         var hash = md5.digest('hex');

        content = content.replace(hashDesc, hash);

        file.contents = new Buffer(content);
        cb(null, file);
    });
};


exports.exports = plugin;