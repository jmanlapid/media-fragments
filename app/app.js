'use strict';

angular.module('app', ['ngRoute', 'LocalStorageModule'])

.config(function($routeProvider, localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('app');

  $routeProvider
    .when("/page1", {
        templateUrl : "/page1.html",
        controller: 'Page1Ctrl'
    })
    .when("/page2", {
        templateUrl : "/page2.html",
        controller: "Page2Ctrl"
    })
    .otherwise('/page1');
})

.run(function() {
  console.log('i am running');
})

.controller('AppCtrl', function() {
  
})
