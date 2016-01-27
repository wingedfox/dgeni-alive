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
.config(function($provide, DOCS_NAVIGATION, DOCS_AREA_DATA) {
    // configure navbar navigation
    var nav = DOCS_AREA_DATA.map(function (id) {
        var nav = DOCS_NAVIGATION[id];
        return {
            title: nav.name,
            href: nav.id,
            path: nav.path,
            key: nav.id
        };
    })
    $provide.constant('NAV', nav);
})
.config(function($mdThemingProvider) {
    // default theme
    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('red');
})
.run(function($location, CONFIG){
    // show api root by default
    if(!$location.path && CONFIG.ROOT) {
        $location.path(CONFIG.ROOT).replace();
    }
});

