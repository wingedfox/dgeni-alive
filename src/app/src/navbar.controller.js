'use strict';

angular.module('docApp').controller('NavbarCtrl', function ($scope, NAV) {
	var navbar = this;
	navbar.areas = NAV;
/*
	angular.forEach(DOCS_NAVIGATION, function(v, k){
		navbar.areas.push({
			id: k,
			name: v.name,
			href: k
		});
	});
*/
	$scope.date = new Date();
});
