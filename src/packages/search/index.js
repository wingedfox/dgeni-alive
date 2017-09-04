var Package = require('dgeni').Package;
var path = require('path');

/**
 * @dgPackage search
 * @description Package maintaining search index processing
 */
module.exports = new Package('search', [require('../jsdoc-ext')])

// Add in the real processors for this package
.processor(require('./processors/search-index'))
;