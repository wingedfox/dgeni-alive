var _ = require('lodash');

/**
 * @dgService getNativeTypeLink
 * @description returns native type link or empty string
 */
module.exports = function getNativeTypeLink(log) {
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
    var nativeTypeRootLink = 'http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/';

    function NativeTypeLink (typeStr) {
        var res = '';
        if (nativeTypeRootLink) {
            var nativeType = nativeTypes.reduce(function(type, prev, nativeType) {
                return type === nativeType.toLowerCase() ? nativeType : prev;
            }.bind(null, (typeStr || '').toLowerCase()), "");

            if (nativeType) {
                res = nativeTypeRootLink + nativeType;
            } else {
                log.warn('getNativeType: Missing type "%s"', typeStr);
            }
        }
        return res;
    };

    Object.defineProperties(NativeTypeLink, {
        /**
         * @name nativeTypeRoot
         * @propertyOf getTypeLink
         * @type {String|null}
         * @description Sets/retrieves url root for native types, by default points to MDN
         *
         * Set to Boolean(false) prevents generation of native links
         */
        'nativeTypeRoot': {
            get: function () {
                return nativeTypeRootLink;
            },
            set: function (v) {
                nativeTypeRootLink = v;
            }
        },
        'nativeTypes': {
            value: nativeTypes
        }
    });

    return NativeTypeLink;
};