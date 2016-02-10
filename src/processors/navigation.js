'use strict';

var _ = require('lodash');

module.exports = function generateNavigationProcessor(aliasMap, log) {

  var debug = log.debug;

  var AREA_NAMES = {
    api: 'API',
    errors: 'Errors',
    guide: 'Guide',
    docs: 'Docs'
  };

  var mappers = {
    api: function (pages) {
      var res = [];

      _(pages)
      .filter('module')
      .sortBy('module')
      .groupBy('module')
      .forEach(function (components, moduleName) {
        debug(moduleName);
        var navGroup = {
          name: moduleName,
          type: 'groups',
          href: 'api/' + moduleName,
          navItems: []
        };

        _(components)
        .filter(function (it) {
          return it.docType !== 'module';
        })
        .sortBy('docType')
        .groupBy('docType')
        .forEach(function (categories, typeName) {
            var navItems = [];
          navGroup.navItems.push({
            name: typeName,
            type: 'section',
            href: 'api/' + moduleName + '/' + typeName,
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

        res.push(navGroup);
      });
      return res;
    },

    guide: function (pages, key) {
      var res = {
        name: 'Guide',
        type: 'groups',
        href: key,
        navItems: []
      };

      _(pages).forEach(function (page) {
        res.navItems.push({
          name: page.name,
          type: '',
          href: page.path
        });
      });

      return [res];
    },

    docs: function (pages, key) {
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
          href: page.path
        });
      });

      return [res];
    },

    error: function (pages, key) {
      var res = {
        name: 'Errors',
        title: 'Error Reference',
        type: 'groups',
        href: key,
        navItems: []
      };

      _(pages).forEach(function (page) {
        res.navItems.push({
          name: page.name,
          type: '',
          href: page.path
        });
      });

      return [res];
    }
  };

  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: function (docs) {

      var areas = {}, areaIds = [];
      _(docs)
      .filter(function (it) {
        return it.area;
      }).groupBy('area').forEach(function (pages, key) {
        debug('start process area:', key);
        // take area aliases and link doc to first one
        var doc = aliasMap.getDocs(key + '-index');
        if (doc.length > 0) {
            doc = doc[0];
        } else {
            log.warn('No index document found for "%s"\nCreate index.ngdoc file in the documents area with template' +
                     '\n===================\n@ngdoc overview\n@id %s-index\n @name %s docs\n@area %s\n@description', key, key, key, key);
            doc = { path: key };
        }

        if (mappers[key]) {
          areas[key] = {
            id: key,
            href: doc.path,
            name: AREA_NAMES[key] || key,
            navGroups: mappers[key](pages, key)
          };
          doc.areaKey = key;
          areaIds.push(key);
        }
      });

      docs.push({
        docType: 'nav-data',
        id: 'nav-data',
        template: 'app/data/nav-data.template.js',
        outputPath: 'data/nav-data.js',
        areas: areas
      });

      docs.push({
        docType: 'nav-data',
        id: 'area-data',
        template: 'app/data/area-data.template.js',
        outputPath: 'data/area-data.js',
        areaIds: areaIds
      });

    }
  };
};
