/*jslint node:true, nomen:true*/

(function () {

    'use strict';

    var fs = require('fs'),
        path = require('path'),
        _ = require('underscore'),
        mkdirp = require('mkdirp');

    module.exports = function (params) {

        var options = _.defaults(params || {}, {
            useragent: '*',
            allow: null,
            disallow: 'cgi-bin/',
            url: null,
            out: null,
            callback: null,
            sitemap: 'sitemap.xml'
        });

        function add(name, rule, config) {
            rule = (typeof rule === 'string' ? [rule] : rule);
            _.each(rule, function (i) {
                config += '\n' + name + ': ' + i;
            });
            return config;
        }

        (function () {

            var config = 'User-agent: ' + options.useragent;

            config = add('Allow', options.allow, config);
            config = add('Disallow', options.disallow, config);

            if (options.url) {
                config += '\nSitemap: ' + options.url + options.sitemap;
            }

            if (options.out) {
                mkdirp(path.dirname(options.out), function (err) {
                    if (err) {
                        throw err;
                    }
                    fs.writeFile(options.out, config, function (err) {
                        if (options.callback) {
                            return options.callback(err, config);
                        }
                        return;
                    });
                });
            } else if (options.callback) {
                return options.callback(null, config);
            }

        }());

    };

}());
