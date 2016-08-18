'use strict';

angular.module('app')

.directive('add', function() {
  var template = [
    '<h2>Add</h2>',
    '<div class="form-group">',
      '<label>Name</label>',
      '<input class="form-control" type="text" ng-model="data.name" placeholder="Enter name"/ >',
    '</div>',
    '<div class="form-group">',
      '<label>Start time</label>',
      '<input class="form-control" type="number" ng-model="data.start" min="0" placeholder="Enter begin time"/ >',
    '</div>',
    '<div class="form-group">',
      '<label>End time</label>',
      '<input class="form-control" type="number" ng-model="data.end" min="0" placeholder="Enter end time"/ >',
    '</div>',
    '<div class="form-group">',
      '<label>Comma separated tags (optional)</label>',
      '<input class="form-control" type="text" ng-model="data.tags" min="0" placeholder="(opt) Comma separated tags"/ ><br>',
    '</div>',
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

.controller('AddCtrl', function(ListSrv, $scope) {
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
