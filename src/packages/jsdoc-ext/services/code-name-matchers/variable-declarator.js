/**
 * @dgService VariableDeclaratorNodeMatcher
 * @description Returns code name from node
 */
module.exports = function VariableDeclaratorNodeMatcherFactory () {
  return function VariableDeclaratorNodeMatcher (node) {
    return node.id && node.id.name;
  }
};
