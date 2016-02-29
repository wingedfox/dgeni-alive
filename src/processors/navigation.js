'use strict';

var _ = require('lodash');

module.exports = function generateNavigationProcessor(aliasMap, log) {

  var debug = log.debug;

  var AREAS = {
  };

  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    /**
     * Appends or replaces mappers
     */
    addMappers: function (mappers) {
      mappers.forEach(function(mapper) {
        AREAS[mapper.area] = mapper;
      })
    },
    $process: function (docs) {

      var areas = {}, areaIds = [];
      _(docs)
      .filter(function (it) {
        return it.area;
      }).groupBy('area').forEach(function (pages, key) {
        debug('Start process area:', key);

        // take area aliases and link doc to first one
        var doc = aliasMap.getDocs(key + ':index');
        if (doc.length > 0) {
            doc = doc[0];
        } else {
            log.warn('No index document found for "%s"\nCreate %s/index.ngdoc file in the documents area with template' +
                     '\n===================\n@ngdoc overview\n@name index\n@area %s\n@description Module Overview', key, key, key);
            doc = { path: key };
        }

        if (AREAS[key]) {
          areas[key] = {
            id: key,
            href: doc.path,
            name: AREAS[key].title || key,
            navGroups: AREAS[key](pages, key),
            fullscreen: doc.fullscreen
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
