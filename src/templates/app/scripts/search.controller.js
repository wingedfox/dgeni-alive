'use strict';

angular.module('docApp')
.controller('SearchCtrl', function SearchCtrl($location, SEARCH){
    var search = this;

    this.change = function change (item) {
        if (item) {
            search.term = '';
            search.item = null;
            $location.path(item.path);
        }
    }

    this.query = function query (text) {
        return SEARCH.filter(function(v){
            return v.filter.test(text);
        });
    }
});
