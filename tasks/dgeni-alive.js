/*
 * dgeni-alive
 * https://github.com/wingedfox/dgeni-alive
 *
 * Copyright (c) 2016 Ilya WingedFox Lebedev ilya@lebedev.net
 * Licensed under the MIT license.
 */

'use strict';

var docgen = require('../src/docgen')();

module.exports = function (grunt) {
    // register task
    grunt.registerMultiTask('dgeni-alive', 'Generate live docs with ngdoc/dgeni.', function () {
        var debug = !!grunt.option('debug');

        // enable debug
        docgen.package().config(function(log) {
            log.level = debug? 'debug': 'info';
        });

        var done = this.async();
        docgen.src(this.filesSrc);
        docgen.dest(this.data.dest);
        docgen.generate().finally(done);
    });
};