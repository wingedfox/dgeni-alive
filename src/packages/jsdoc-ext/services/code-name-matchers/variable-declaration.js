/**
 * @dgService VariableDeclarationNodeMatcher
 * @description Returns code name from node
 */
module.exports = function VariableDeclarationNodeMatcherFactory (codeNameService) {
  return function VariableDeclarationNodeMatcher (node) {
    return codeNameService.find(node.declarations[0]);
  }
};
