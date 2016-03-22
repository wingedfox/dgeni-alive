/**
 * @dgService AssignmentExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function AssignmentExpressionNodeMatcherFactory (codeNameService) {
  return function AssignmentExpressionNodeMatcher (node) {
    return node && codeNameService.find(node.right) || codeNameService.find(node.left);
  }
};
