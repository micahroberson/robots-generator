/*jslint devel:true*/
/*global module, require*/

(function () {

    'use strict';

    var fs = require('fs'),
        defaults = require('lodash.defaults'),
        path = require('path'),
        mkdirp = require('mkdirp');

    module.exports = function (params) {

        var options = defaults(params || {}, {
            useragent: '*',
            allow: null,
            disallow: 'cgi-bin/',
            url: null,
            out: 'dist',
            callback: null
        }),
            config = 'User-agent: ' + options.useragent,
            directory = path.normalize(options.out),
            file = directory + '/robots.txt';

        function add(name, rule) {
            var i;
            if (rule) {
                if (typeof rule === 'string') {
                    config += '\n' + name + ': ' + rule;
                } else {
                    for (i = 0; i < rule.length; i += 1) {
                        config += '\n' + name + ': ' + rule[i];
                    }
                }
            }
        }

        (function () {

            add('Allow', options.allow);
            add('Disallow', options.disallow);

            if (options.url) {
                config += '\nSitemap: ' + options.url + 'sitemap.xml';
            }

            mkdirp(directory, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }

                fs.writeFile(file, config, function (err) {
                    if (options.callback) {
                        return options.callback(err, 'Generated robots.txt');
                    }
                });

            });

        }());

    };

}());
