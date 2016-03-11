var _ = require('lodash');
var catharsis = require('catharsis');

/**
 * @dgService getTypeName
 * @description Get short name by long type
 */
module.exports = function getTypeName(aliasMap, log, getNativeTypeLink) {

    function TypeName (typeStr) {
        var type;
        var typeName = typeStr;
        try {
            if ('Function' == typeName) {
                typeName = '{' + typeName + '}';
            }
            type = catharsis.parse(typeName);
            if (type.type === catharsis.Types.TypeApplication && (type.expression.name === 'Array' || type.expression.name === 'Object')) {
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
            if (type) {
                type.applications[0].name = doc.aliases[0];
                res = catharsis.stringify(type);
            } else {
                res = doc.aliases[0];
            }
            log.debug('getTypeName: Generating short name for "%s" - "%s"', typeStr, res);
        } else if (doc.length === 0) {
            // try to match native object
            if (!getNativeTypeLink(typeName)) {
                log.warn('getTypeName: Missing type "%s"', typeStr);
            }
            res = typeStr;
        } else {
            log.warn('getTypeName: Ambiguous type name "%s"\nMatching docs: %s', typeStr, _.reduce(doc,
                function(msg, doc) {
                    return msg + '\n  "' + doc.typeStr + '"';
                }, "").toString());
        }
        return res;
    };

    return TypeName;
};