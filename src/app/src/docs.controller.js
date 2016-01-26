'use strict';

angular.module('docApp').controller('DocsCtrl', function($scope, $location, $window, CONFIG, DOCS_NAVIGATION){
	var docs = this;
	var basePath = '/';

	docs.currentArea = null;

	docs.isCurrent = function (navItem) {
		return ('/' + navItem.href === docs.currentPath);
	};

	docs.changeCurrent = function(newPath, hash){
		var area;
		docs.currentPath = newPath;
		newPath = newPath.replace(new RegExp('^' + basePath), '');
		area = newPath.split('/')[0];
		docs.currentArea = DOCS_NAVIGATION[area];

		if(newPath === '' || newPath === 'index.html'){
			newPath = 'index';
		}
		if(!newPath.match(/\.html$/)){
			newPath = newPath + '.html';
		}
		newPath = 'partials/' + newPath;

		//console.log(newPath, hash);

		docs.currentHash = hash;
		docs.partialPath = newPath;

	};

    $scope.$on('$locationChangeStart', function(){
        docs.changeCurrent($location.path(), $location.hash());
    });

    $scope.$on('$locationChangeSuccess', function () {
        var title = CONFIG.TITLE;
        if (docs.currentArea && docs.currentArea.name) {
            title += " : " + docs.currentArea.name;
        }
        $window.document.title = title;
    });
});

