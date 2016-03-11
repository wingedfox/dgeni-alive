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

  return {
    locals: function(n, v) {
      if (void(v) === v) {
        delete locals[n];
      } else {
        locals[n] = v;
      }
      return this;
    },
    $runBefore: ['rendering-docs'],
    $process: function (docs) {
      templates.forEach(function(t) {
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
