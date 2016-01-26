'use strict';

module.exports = function generateConfigProcessor(log) {

  var debug = log.debug;

  var title = "";
  var root = "";

  return {
    title: function(t) {
      title = t;
      return this;
    },
    rootArea: function(r) {
      root = r;
      return this;
    },
//    $runAfter: ['docs-rendered'],
//    $runBefore: ['writing-files'],
    $runBefore: ['rendering-docs'],
    $process: function (docs) {
      docs.push({
        docType: 'config',
        id: 'config',
        template: 'config.template.js',
        outputPath: 'src/config.js',
        config: {
            TITLE: title,
            ROOT: root
        }
      });
    }
  };
};
