/**
 * @dgService FunctionDeclarationNodeMatcher
 * @description Returns code name from node
 */
module.exports = function FunctionDeclarationNodeMatcherFactory () {
  return function FunctionDeclarationNodeMatcher (node) {
    return node.id && node.id.name;
  }
};
