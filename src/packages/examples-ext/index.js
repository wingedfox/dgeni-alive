var Package = require('dgeni').Package;
var path = require('path');

/**
 * @dgPackage examples-ext
 * @description Extensions for the dgeni-packages/examples
 */
module.exports = new Package('examples-ext', [require('dgeni-packages/examples')])

  // Add in the real processors for this package
  .processor(require('./processors/exampleDependenciesBuilder'))

  // add more templates location
  .config(function(templateFinder) {
      templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
  })

  // add doctype for example-dependency
  .config(function(computePathsProcessor, computeIdsProcessor) {
      computeIdsProcessor.idTemplates.push({
          docTypes: ['example-dependency'],
          getAliases: function(doc) { return [doc.id]; }
      });
  });