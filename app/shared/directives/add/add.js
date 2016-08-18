'use strict';

angular.module('app')

.directive('add', function() {
  var template = [
    '<h2>Add</h2>',
    '<input type="text" ng-model="data.name" placeholder="Enter name"/ ><br>',
    '<input type="number" ng-model="data.start" min="0" placeholder="Enter begin time"/ ><br>',
    '<input type="number" ng-model="data.end" min="0" placeholder="Enter end time"/ ><br>',
    '<button ng-click="addNewSplice(data)" ng-disabled="disabled(data)">Add</button>'
  ].join('');

  return {
    template: template,
    restrict: 'E',
    scope: true,
    controller: 'AddCtrl',
    link: function(scope, element, attributes) {
    }
  }
})

.controller('AddCtrl', function(AddSrv, ListSrv, $scope) {
  angular.extend($scope, {
    data: {}
  });

  $scope.addNewSplice = function(newSplice) {
    if (!newSplice) {
      return;
    }
    ListSrv.add(newSplice);
    $scope.data = {};
  };

  $scope.disabled = function(newSplice) {
    return newSplice.name === undefined ||
      newSplice.start === undefined ||
      newSplice.end === undefined;
  };
})
