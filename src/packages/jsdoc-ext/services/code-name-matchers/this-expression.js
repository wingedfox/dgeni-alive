/**
 * @dgService ThisExpressionNodeMatcher
 * @description Returns code name from node
 */
module.exports = function ThisExpressionNodeMatcherFactory (codeNameService) {
	/**
	 * @param {Node} node AST node to process
	 * @returns {String|Null} code name from node
	 */
	return function ThisExpressionNodeMatcher (node) {
		return null;
	}
};