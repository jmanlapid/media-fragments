'use strict';

angular.module('app', ['ngRoute', 'ui.router'])

.config(function($routeProvider, $stateProvider) {

  $stateProvider.state(
    "page1", {
      url: '/page1',
      controller: 'Page1Ctrl',
      templateUrl: '/app/components/page1/page1.html'
    },
    "page2", {
      url: '/page2',
      controller: 'Page2Ctrl',
      templateUrl: '/app/components/page2/page2.html'
    })

  $routeProvider.otherwise('/page2');
})

.run(function($state) {
  $state.go('page2')
})

.controller('AppCtrl', function() {

})
