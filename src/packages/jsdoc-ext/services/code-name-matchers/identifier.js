/**
 * @dgService IdentifierNodeMatcher
 * @description Returns code name from node
 */
module.exports = function IdentifierNodeMatcherFactory () {
  return function IdentifierNodeMatcher (node) {
    return node.name;
  }
};
