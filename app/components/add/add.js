'use strict';

angular.module('video-splicer')

.directive('add', function() {
  var template = [
    '<h1>Add</h1>',
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

.controller('AddCtrl', function(AddSrv, $scope) {
  angular.extend($scope, {
    data: {}
  });

  $scope.addNewSplice = function(newSplice) {
    if (newSplice && newSplice.name != undefined && newSplice.name.length && 
      newSplice.start != undefined && newSplice.end != undefined ) {
    }
    AddSrv.broadcast(newSplice);
    $scope.data = {};
  };

  $scope.disabled = function(newSplice) {
    return newSplice.name === undefined ||
      newSplice.start === undefined ||
      newSplice.end === undefined;
  };
})
