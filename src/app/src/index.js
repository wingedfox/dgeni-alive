'use strict';

var DOCS_OVERWRITELINK = true;

angular.module('docApp', ['ngMaterial'])
.constant('DOCS_OVERWRITELINK', typeof DOCS_OVERWRITELINK === 'undefined' ? false : DOCS_OVERWRITELINK)
.provider('DOCS_OVERWRITELINK', function (DOCS_OVERWRITELINK) {
	return {
		$get: function () {
			return DOCS_OVERWRITELINK;
		}
	};
})
.config(function($locationProvider, DOCS_OVERWRITELINK){
	if(!DOCS_OVERWRITELINK){
		$locationProvider.hashPrefix('!');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: true,
			rewriteLinks: true
		});
	}
})
.run(function($location){
	if(!$location.path) {
		$location.path('api').replace();
        }
});

