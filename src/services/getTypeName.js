var _ = require('lodash');

/**
 * @dgService getTypeName
 * @description Get short name by id
 */
module.exports = function getTypeName(aliasMap, log, getTypeLink) {
    return function(id) {

        var doc = aliasMap.getDocs(id);
        var res = '';

        if (doc.length === 1) {
            doc = doc[0];
            res = doc.aliases[0];
            log.debug('getTypeName: Generating short name for "%s" - "%s"', id, res);
        } else if (doc.length === 0) {
            // try to match native object
            if (getTypeLink.nativeTypes.indexOf(id) < 0) {
                log.warn('getTypeName: Missing type "%s"', id);
            }
            res = id;
        } else {
            log.warn('getTypeName: Ambiguous type name "%s"\nMatching docs: %s', id, _.reduce(doc,
                function(msg, doc) {
                    return msg + '\n  "' + doc.id + '"';
                }, "").toString());
        }
        return res;
    };
};