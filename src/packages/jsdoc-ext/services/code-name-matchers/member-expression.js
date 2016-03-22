/**
 * @dgService MemberExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function MemberExpressionNodeMatcherFactory (codeNameService) {
  return function MemberExpressionNodeMatcher (node) {
    return codeNameService.find(node.property);
  }
};
