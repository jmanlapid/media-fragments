'use strict';

angular.module('app', ['ngRoute', 'ui.router'])

.config(function($routeProvider, $stateProvider) {
  // $routeProvider.otherwise('/page1');

  $stateProvider.state(
    "page1", {
      controller: 'Page1Ctrl'
      template:[
      '<div class="container">',
        '<div class="row">',
          '<h1>Video Splicer - Page ONE Template</h1>',
        '<button></button>',
        '</div>',
        '<div class="row">',
          '<div class="col-md-2">',
            '<add></add>',
            '<list></list>',
          '</div>',
          '<div class="col-md-8">',
            '<player></player>',
          '</div>',
        '</div>',
      '</div>'
      ].join('')
    })

})

.run(function($state) {
  console.log('i am running');
  $state.go('page1');
})

.controller('AppCtrl', function() {

})
