var Package = require('dgeni').Package;

/**
 * @dgPackage ngdoc-ext
 * @description Extensions for the dgeni-packages/ngdoc
 */
module.exports = new Package('ngdoc-ext', [require('dgeni-packages/ngdoc')])

// Add in the real processors for this package
.processor(require('./processors/embedImages'))
.processor(require('./processors/generateErrorsGroupArea'));