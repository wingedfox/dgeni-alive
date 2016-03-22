/**
 * @dgService ProgramNodeMatcher
 * @description Returns code name from node
 */
module.exports = function ProgramNodeMatcherFactory (codeNameService) {
  return function ProgramNodeMatcher (node) {
    return node.body[0] ? codeNameService.find(node.body[0]) : null;
  }
};
