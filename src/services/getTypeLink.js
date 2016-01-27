var _ = require('lodash');
var catharsis = require('catharsis');

/**
 * @dgService getTypeLink
 * @description Get link to type
 */
module.exports = function getTypeLink(aliasMap, log, getNativeTypeLink) {

    function TypeLink (typeStr) {
        var type;
        var typeName = typeStr;
        try {
            if ('Function' == typeName) {
                typeName = '{' + typeName + '}';
            }
            type = catharsis.parse(typeName);
            if (type.type === catharsis.Types.TypeApplication && type.expression.name === 'Array') {
                typeName = type.applications[0].name;
            } else if (type.type === catharsis.Types.FunctionType) {
                typeName = 'Function';
                type = null;
            } else {
                typeName = typeStr;
                type = null;
            }
        } catch (e) {
//            log.error('getTypeName: Parse of "%s" failed with reason: %s', typeStr, e.message);
            typeName = typeStr;
        }

        var doc = aliasMap.getDocs(typeName);
        var res = '';

        if (doc.length === 1) {
            doc = doc[0];
            log.debug('getTypeLink: Generating link for "%s" - "%s"', typeStr, doc.path);
            res = doc.path;
        } else if (doc.length === 0) {
            // try to match native object
            res = getNativeTypeLink(typeName);

            if (!res) {
                log.warn('getTypeLink: Missing type "%s"', typeStr);
            }
        } else {
            log.warn('getTypeLink: Ambiguous type name "%s"\nMatching docs: %s', typeStr, _.reduce(doc,
                function(msg, doc) {
                    return msg + '\n  "' + doc.id + '"';
                }, "").toString());
        }
        return res;
    };

    return TypeLink;
};