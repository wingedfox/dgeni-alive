/**
 * @dgService ExpressionStatementNodeMatcher
 * @description Returns code name from node
 */
module.exports = function ExpressionStatementNodeMatcherFactory (codeNameService) {
  return function ExpressionStatementNodeMatcher (node) {
    return codeNameService.find(node.expression);
  }
};
