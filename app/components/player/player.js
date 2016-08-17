'use strict';

angular.module('video-splicer')

.directive('player', function() {
  var template = [
    '<h1>Player</h1>',
    '<video controls preload="metadata" width="720px" height="540px">',
      '<source ng-src="{{data.src}}" type="video/mp4">',
    '</video>'
  ].join('');
  return {
    template: template,
    restrict: 'E',
    scope: true,
    controller: 'PlayerCtrl',
    link: function(scope, element, attributes) {

    }
  }
})

//http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/

.controller('PlayerCtrl', function($scope) {
  angular.extend($scope, {
    data: {
      src: './rugby-tries.mp4'
    }
  });
})
