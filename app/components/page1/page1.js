'use strict';

angular.module('app')
  .controller('Page1Ctrl', function($scope, $state) {
    angular.extend($scope, {
      state: $state
    });
  })