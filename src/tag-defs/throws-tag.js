module.exports = function(extractTypeTransform, wholeTagTransform) {
  return {
    name: 'throws',
    aliases: ['throw'],
    transforms: [ extractTypeTransform, wholeTagTransform ]
  };
};