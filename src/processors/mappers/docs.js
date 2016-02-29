'use strict';

var _ = require('lodash');

module.exports = function navigationMapper_DOCS(aliasMap, log) {

  var debug = log.debug;

  function docsMapper (pages, key) {
    var res = {
      name: 'Docs',
      type: 'groups',
      href: key,
      navItems: []
    };

    _(pages).forEach(function (page) {
      res.navItems.push({
        name: page.name,
        type: '',
        href: page.path,
        title: page.title,
        fullscreen: page.fullscreen
      });
    });

    return [res];
  };


  Object.defineProperty(docsMapper, 'area', {
    value: 'docs'
  });

  Object.defineProperty(docsMapper, 'title', {
    value: 'Docs'
  });

  return docsMapper;
};
