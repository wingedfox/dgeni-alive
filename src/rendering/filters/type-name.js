module.exports = function(getTypeName) {
  return {
    name: 'typeName',
    process: getTypeName
  };
};