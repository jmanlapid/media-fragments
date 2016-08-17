'use strict';

angular.module('video-splicer')

.directive('edit', function() {
  var template = 'EDIT';


  return {
    template: template,
    restrict: 'E',
    controller: 'EditCtrl',
    link: function(scope, element, attributes) {

    }
  }
})

.controller('EditCtrl', function() {

})
