/**
 * @dgService PropertyNodeMatcher
 * @description Returns code name from node
 */
module.exports = function PropertyNodeMatcherFactory (codeNameService) {
  return function PropertyNodeMatcher (node) {
    return codeNameService.find(node.value) || codeNameService.find(node.key);
  }
};
