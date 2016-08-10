'use strict';

module.exports = function generateWebsite(log, templateFinder) {

//  templateFinder.templateFolders.unshift(path.resolve(__dirname, '../src/templates'));

  var debug = log.debug;

  var templates = [
      'index.html',
      'views/content.html',
      'views/footer.html',
      'views/main.html',
      'views/navbar.html',
      'views/sidebar.html',
      'views/searchbox.html',
      'scripts/a.directive.js',
      'scripts/docs.controller.js',
      'scripts/index.js',
      'scripts/main.controller.js',
      'scripts/navbar.controller.js',
      'scripts/search.controller.js',
      'scripts/pre.directive.js',
      'scripts/bloomfilter.js',
      'styles/docs.css',
      'styles/github.css',
      'styles/runnableExample.css',
      'bower.json',
      '.bowerrc'
  ];
  var locals = {};

  /**
   * An array of objects
   * @type {Array}
   *
   * {
   *    template: 'views/main.html',
   *    file: 'main.html'
   * }
   *
   * Be sure to add the template folder that your new main.html is in so it can find it.
   */
  var templateOverrides = [];

  return {
    locals: function(n, v) {
      if (void(v) === v) {
        delete locals[n];
      } else {
        locals[n] = v;
      }
      return this;
    },
    addTemplateOverride: function(template, file) {
      if(template && file) {
        templateOverrides.push({
          template: template,
          file: file
        });
      }
    },
    $runBefore: ['rendering-docs'],
    $process: function (docs) {

      var filteredTemplates = [];

      // If you have an override, lets remove what it is overriding in the default templates
      templates.forEach(function(t) {
        var shouldOverride = false;

        templateOverrides.forEach(function(to) {
          if(to.template === t) {
            shouldOverride = true;
          }
        });

        if(!shouldOverride) {
          filteredTemplates.push(t);
        }
      });

      // Add the overridden templates
      templateOverrides.forEach(function(to) {
        docs.push({
          docType: 'website',
          id: to.template,
          template: to.file,
          outputPath: to.template,
          locals: locals
        });
      });

      filteredTemplates.forEach(function(t) {
        docs.push({
          docType: 'website',
          id: t,
          template: 'app/' + (/^\./.test(t) ? 'dot' + t : t),
          outputPath: t,
          locals: locals
        });
      });
    }
  };
};
