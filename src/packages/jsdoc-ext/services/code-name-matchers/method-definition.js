/**
 * @dgService MethodDefinitionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function MethodDefinitionNodeMatcherFactory (codeNameService) {
  return function MethodDefinitionNodeMatcher (node) {
    return codeNameService.find(node.key);
  }
};
