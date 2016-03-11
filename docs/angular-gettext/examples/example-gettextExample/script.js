(function(angular) {
  'use strict';
angular.module('gettextExample', ['gettext']).controller('GettextController', function($scope, gettextCatalog) {
  gettextCatalog.debug = true;
  gettextCatalog.showTranslatedMarkers = true;
  gettextCatalog.translatedMarkerPrefix = '->';
  gettextCatalog.translatedMarkerSuffix = '<-';
  gettextCatalog.currentLanguage = 'nl';
  gettextCatalog.setStrings('en-US', {
    'Hi, {{gtx.name}}!': 'Hello, {{gtx.name}}!',
    'Bye, {{gtx.name}}!': '',
  });
  gettextCatalog.setStrings('es-ES', {
    'Hi, {{gtx.name}}!': '',
    'Bye, {{gtx.name}}!': '¡Adious, {{gtx.name}}!',
  })
  gettextCatalog.setStrings('nl', {
    'Hi, {{gtx.name}}!': 'Halo, {{gtx.name}}!',
    'Bye, {{gtx.name}}!': 'Doei, {{gtx.name}}!',
  });

  this.name = 'Ruben';
  this.options = gettextCatalog;

  this.update = function () {
    // a kind of hack, service settings are not tracked for real time changes
    $scope.$root.$broadcast('gettextLanguageChanged');
  }
});
})(window.angular);