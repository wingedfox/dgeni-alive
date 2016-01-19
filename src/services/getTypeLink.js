var _ = require('lodash');

/**
 * @dgService getTypeLink
 * @description Get link to type
 */
module.exports = function getTypeLink(aliasMap, log) {
    var arrayReg = /^Array\.<([^>]+)>/i;
    var nativeTypes = [
        'arguments', 'Array', 'ArrayBuffer', 'Boolean', 'DataView', 'Date', 'Error', 'EvalError', 'Float32Array',
        'Float64Array', 'Function', 'Generator', 'GeneratorFunction', 'Infinity', 'Int16Array', 'Int32Array',
        'Int8Array', 'InternalError', 'Intl', 'Intl.Collator', 'Intl.DateTimeFormat', 'Intl.NumberFormat', 'Iterator',
        'JSON', 'Map', 'Math', 'NaN', 'null', 'Number', 'Object', 'ParallelArray', 'Promise', 'Proxy', 'RangeError',
        'ReferenceError', 'Reflect', 'RegExp', 'SIMD', 'SIMD.Float32x4', 'SIMD.Float64x2', 'SIMD.Int16x8',
        'SIMD.Int32x4', 'SIMD.Int8x16', 'Set', 'StopIteration', 'String', 'Symbol', 'SyntaxError', 'TypeError',
        'TypedArray', 'URIError', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray', 'WeakMap',
        'WeakSet', 'undefined'
    ];
    var nativeTypeRootLink = '//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/';

    return function(typeStr) {
        // check for array types and strip them to get actual type
        if (arrayReg.test(typeStr)) {
            typeStr = typeStr.match(arrayReg)[1];
        }

        var doc = aliasMap.getDocs(typeStr);
        var res = '';

        if (doc.length === 1) {
            doc = doc[0];
            log.debug('getTypeLink: Generating link for "%s" - "%s"', typeStr, doc.path);
            res = doc.path;
        } else if (doc.length === 0) {
            // try to match native object
            if (nativeTypes.indexOf(typeStr)) {
                res = nativeTypeRootLink + typeStr;
            } else {
                log.warn('getTypeLink: Missing type "%s"', typeStr);
            }
        } else {
            log.warn('getTypeLink: Ambiguous type name "%s"\nMatching docs: %s', typeStr, _.reduce(doc,
                function(msg, doc) {
                    return msg + '\n  "' + doc.id + '"';
                }));
        }
        return res;
    };
};