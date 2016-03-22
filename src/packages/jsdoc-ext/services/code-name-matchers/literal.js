/**
 * @dgService LiteralNodeMatcher
 * @description Returns code name from node
 */
module.exports = function LiteralNodeMatcherFactory () {
  return function LiteralNodeMatcher (node) {
    return node.value;
  }
};
