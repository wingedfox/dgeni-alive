var Package = require('dgeni').Package;
var path = require('path');

/**
 * @dgPackage jsx
 * @description Package related to React tooling
 */
module.exports = new Package('jsx', [require('../ngdoc-ext')])

// Add in the real processors for this package
.factory(require('./file-readers/jsxFileReader'))

// add more templates location and matching patterns
.config(function(templateFinder) {
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
})

// add the JSX file reading service to the processor
.config(function (readFilesProcessor, jsxFileReader) {
  readFilesProcessor.fileReaders.unshift(jsxFileReader);
})

// setting readFilesProcessor configuration
.config(function(computePathsProcessor, computeIdsProcessor, createDocMessage, getAliases) {
  computeIdsProcessor.idTemplates.push({
    docTypes: ['React'],
    idTemplate: 'module:${module}.${docType}:${name}',
    getAliases: getAliases
  });

  computePathsProcessor.pathTemplates.push({
    docTypes: ['React'],
    pathTemplate: '${area}/${module}/${docType}/${name}',
    outputPathTemplate: 'partials/${area}/${module}/${docType}/${name}.html'
  });
});
