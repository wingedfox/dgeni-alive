/**
 * @dgService NewExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function NewExpressionNodeMatcherFactory (codeNameService) {
  return function NewExpressionNodeMatcher (node) {
    return codeNameService.find(node.callee);
  }
};
