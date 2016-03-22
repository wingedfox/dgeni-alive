var path = require('canonical-path');
var Package = require('dgeni').Package;

/**
 * @dgPackage jsdoc
 * @description Tag parsing and extracting for JSDoc-based documentation
 */
//module.exports = new Package('jsdoc-ext', [require('dgeni-packages/jsdoc')])
module.exports = new Package('jsdoc-ext', [require('../jsdoc')])

// Add in the real processors for this package
.processor(require('./processors/code-name'))

.factory(require('./services/code-name-map'))
.factory(require('./services/code-name'))
.factory(require('./services/transforms/extract-access'))

.config(function(codeNameService, getInjectables) {
  codeNameService.matchers = getInjectables(require('./services/code-name-matchers'));
})

.config(function(parseTagsProcessor, getInjectables) {
  parseTagsProcessor.tagDefinitions = parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
});