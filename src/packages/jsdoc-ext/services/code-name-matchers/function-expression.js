/**
 * @dgService FunctionExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function FunctionExpressionNodeMatcherFactory () {
  return function FunctionExpressionNodeMatcher (node) {
    return node.id && node.id.name;
  }
};
