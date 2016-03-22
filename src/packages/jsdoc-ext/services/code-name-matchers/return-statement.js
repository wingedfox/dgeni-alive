/**
 * @dgService ReturnStatementNodeMatcher
 * @description Returns code name from node
 */
module.exports = function ReturnStatementNodeMatcherFactory (codeNameService) {
  return function ReturnStatementNodeMatcher (node) {
    return codeNameService.find(node.argument);
  }
};
