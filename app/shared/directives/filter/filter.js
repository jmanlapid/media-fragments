'use strict';

angular.module('app')

.directive('filter', function($timeout, ListSrv) {
  var template = [
    '<h2>Filter {{data.filteredTags.length ? "(" + data.list.length + " results)" : "(showing all)"}}</h3>',
    '<form ng-submit="filter(data.input)">',
      '<input type="text" ng-model="data.input" placeholder="Enter tag and press enter to filter"><br>',
    '</form>',
    '<button submit="false" ng-click="clearFilters()">Clear Filters</button>&nbsp;',
    '<button ng-repeat="tag in data.filteredTags track by $index" ng-click="removeFilter($index)">{{tag}} x</button>&nbsp;'
  ].join('');

  return {
    template: template,
    restrict: 'E',
    scope: {
    },  
    link: function(scope, element, attributes) {
      angular.extend(scope, {
        data: {
          list: ListSrv.getItems(),
          input: '',
          filteredTags: []
        },
        filter: function(keyword) {
          if (!keyword) return;
          scope.data.filteredTags.push(keyword.trim());
          ListSrv.filterListByTags(scope.data.filteredTags);
          scope.data.input = '';
        },
        clearFilters: function() {
          scope.data.filteredTags = [];
          ListSrv.loadFromLocalStorage();
        },
        removeFilter: function(index) {
          scope.data.filteredTags.splice(index, 1);
          ListSrv.filterListByTags(scope.data.filteredTags);
        }
      }); 
    
      scope.$watch(function() { return ListSrv.getItems(); }, function(newList) {
        scope.data.list = newList;
      }, true);
    }
  }
})
