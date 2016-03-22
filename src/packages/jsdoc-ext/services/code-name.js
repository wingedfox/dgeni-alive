var _ = require('lodash');

/**
 * @dgProcessor codeNameService
 * @description  Infer the name of the document from name of the following code
 */
module.exports = function codeNameService(log, codeNameMap, getInjectables) {
  var REMOVE_SUFFIX_REGEX = /NodeMatcher$/;

  /**
   * Registers code name mappers
   * @param {Function|Function[]}
   */
  function registerCodeNameMatcher () {
    var list;
    if (_.isArray(arguments[0])) {
      list = arguments[0];
    } else {
      list = Array.prototype.slice(arguments);
    }

    list.forEach(function(v) {
      codeNameMap.set(v.name.replace(REMOVE_SUFFIX_REGEX, ''), v);
    });
  }

  /**
   * Recurse down the code AST node that is associated with this doc for a name
   * @param  {Object} node The JS AST node information for the code to find the name of
   * @return {String}      The name of the code or null if none found.
   */
  function findCodeName(node) {
    var matcher = codeNameMap.get(node.type);
    if (matcher) {
      return matcher(node);
    } else {
      log.warn('HELP! Unrecognised node type: ' + node.type);
      log.warn(node);
      return null;
    }
  }

  var api = {}

  Object.defineProperties(api, {
    matchers: {
      set: registerCodeNameMatcher
    },
    find: {
      value: findCodeName
    }
  });

  return api;
};
