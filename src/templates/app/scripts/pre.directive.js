'use strict';

angular.module('docApp').directive('pre', function () {
  return {
    restrict: 'E',
    terminal: true,
    primary: 1000,
    /* global prettyPrintOne */
    link: function ($scope, $elem) {
      var formatted = prettyPrintOne($elem.find('>code').html());
      $elem.addClass('prettyprint');
      $elem.find('>code').html(formatted);
    }
  };
});
