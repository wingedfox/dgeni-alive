'use strict';

var _ = require('lodash');

module.exports = function navigationMapper_API(aliasMap, log) {

  var debug = log.debug;

  function apiMapper (pages) {
    var res = [];

    _(pages)
      .filter('module')  // take only the modules on the top level
      .sortBy('module')  // alphabetic sort
      .groupBy('module') // group by name
      .forEach(function (components, moduleName) {
        debug('Processing module: %s', moduleName);
        var mod = _.find(components, {name: moduleName, module: moduleName});

        var navGroup = {
          name: moduleName,
          type: 'groups',
          href: mod.path, // 'api/' + moduleName, // conforms path calculation in docgen.js
          navItems: []
        };
        res.push(navGroup);

        _(components)
        .filter(function (it) {
          return it.docType !== 'module' && it.docType !== 'overview';
        })
        .sortBy('docType')
        .groupBy('docType')
        .forEach(function (categories, typeName) {
          var navItems = [];
          var type = _.find(pages, {moduleName: moduleName, groupType: typeName, docType: 'componentGroup'});

          navGroup.navItems.push({
            name: typeName,
            type: 'section',
            href: type.path,
            navItems: navItems
          });

          _(categories)
            .sortBy('name')
            .forEach(function (it) {
              if (it.docType !== 'module') {
                navItems.push({
                  name: it.name,
                  type: it.docType,
                  href: it.path
                });
            }
          });
        });
      });
    return res;
  };

  Object.defineProperty(apiMapper, 'area', {
    value: 'api'
  });

  Object.defineProperty(apiMapper, 'title', {
    value: 'API'
  });

  return apiMapper;
};
