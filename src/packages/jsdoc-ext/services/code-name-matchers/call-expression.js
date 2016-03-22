/**
 * @dgService CallExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function CallExpressionNodeMatcherFactory (codeNameService) {
  return function CallExpressionNodeMatcher (node) {
    return codeNameService.find(node.callee);
  }
};
