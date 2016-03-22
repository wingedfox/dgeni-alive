/**
 * @dgService ThrowStatementNodeMatcher
 * @description Returns code name from node
 */
module.exports = function ThrowStatementNodeMatcherFactory (codeNameService) {
  return function ThrowStatementNodeMatcher (node) {
    return codeNameService.find(node.argument);
  }
};
