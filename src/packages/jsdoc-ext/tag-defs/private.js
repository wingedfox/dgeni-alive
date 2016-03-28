module.exports = function(accessTagTransform) {
  var name = 'private';

  accessTagTransform.addTag(name);
  accessTagTransform.addValue(name);

  function getValue () {
    return name;
  }

  return {
    name: name,
    docProperty: 'access',
    transforms: [getValue, accessTagTransform]
  };
};