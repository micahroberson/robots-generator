# Robots Generator [![Build Status](https://travis-ci.org/haydenbleasel/robots-generator.svg?branch=master)](https://travis-ci.org/haydenbleasel/robots-generator)

Robots.txt generator for Node.js. Produces a simple, valid robots.txt to be parsed by web crawlers. Adheres to the [specification](https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt) provided by Google, however currently only supports one User-Agent rule. Installed through NPM with:

```
npm install robots-generator --save-dev
```

Simply require the module and execute it with an optional array of configuration.

- User-Agent: A means of identifying a specific crawler or set of crawlers.
- Allow: A directory or set of directories that a crawler is allowed to access.
- Disallow: A directory or set of directories that a crawler is not allowed to access.
- URL: Your website's URL (required, used for sitemap reference).
- Out: The destination path and filename.
- Callback: Function to execute upon completion (parameters are 'error' and 'file').
- Sitemap: Filename or path to be appended to URL. Defaults to 'sitemap.xml'

Allow and Disallow can be an array, a string or null (not added to the file). Defaults are shown below:

```
var robots = require('robots-generator');

robots({
  useragent: '*',
  allow: null,
  disallow: 'cgi-bin/',
  url: null,
  out: null,
  callback: null,
  sitemap: 'sitemap.xml.gz'
});
```
