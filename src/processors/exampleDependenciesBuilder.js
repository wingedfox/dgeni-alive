'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');

module.exports = function exampleDependenciesBuilder (readFilesProcessor, log, generateExamplesProcessor, exampleMap) {
  /**
   * Regular expression to check if path is external
   * @type {RegExp}
   */
  var REMOTE_REG = /(https?:)?\/\//i;

  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['generateExamplesProcessor'],
//    $runBefore: ['extra-docs-added'],
    $process: function (docs) {
      /**
       * Deployments file storage, each de
       */
      var deployments = [];

      // traverse deployments, check project dependencies and add local file
      // dependencies to the list of generated documents
      generateExamplesProcessor.deployments.forEach(function(deployment) {
        var name = makeUniqueName(deployments, deployment.name);
        log.info(0, name)
        var commonFiles = deployment.examples && deployment.examples.commonFiles || {};
        (commonFiles.scripts || []).forEach(function(script, idx){
          log.info(1, script, idx, name)
          if (!REMOTE_REG.test(script)) {
            // local file, add to copy items
              log.info(2, script)
            var fileDoc = {
              docType: 'example-dependency',
              id: name + '/' + script,
              fileContents: fs.readFileSync(path.join(readFilesProcessor.basePath, script)),
              template: 'template' + path.extname(script),
              // make path relative to example output template examples/${example.id}/index,
              path: path.join('../../examples-dep', name, script),
              outputPath: path.join('examples-dep', name, script),
            };

            commonFiles.scripts[idx] = fileDoc.path;
            docs.push(fileDoc);
          }
         });
        (commonFiles.stylesheets || []).forEach(function(stylesheet){
          if (!REMOTE_REG.test(stylesheet)) {
            // local file, add to copy items

          }
         });
      })
    }
  };

  /**
   * Creates unique folder name for the current deployment
   */
  function makeUniqueName (deployments, name) {
      if (!name) {
        name = 'deployment';
      }
      var i = 0;
      while (deployments.indexOf((name + (i ? i : ''))) > -1) {
          i++;
      }
      if (i) {
          name = name + i;
      }
      deployments.push(name);
      return name;
  }
};
