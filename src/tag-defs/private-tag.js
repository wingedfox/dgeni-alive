module.exports = function(accessTagTransform, trimWhitespaceTransform) {
  var name = 'private';

  accessTagTransform.addTag(name);
  accessTagTransform.addValue(name);

  return {
    name: name,
    docProperty: 'access',
//    defaultFn: function() { return name },
    transforms: [accessTagTransform, trimWhitespaceTransform]
  };
};