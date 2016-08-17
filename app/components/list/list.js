'use strict';

angular.module('video-splicer')

.directive('list', function() {
  var template = [
    '<h1>List</h1>',
    '<div ng-repeat="item in list">',
      '<span>{{item.name}}<span><br>',
      '<span>{{item.start}} - {{item.end}}</span><br>',
      '<button>Play</button>',
      '<button>Edit</button>',
      '<button>Delete</button><br><br>',
    '</div>'
  ].join('');

  return {
    template: template,
    restrict: 'E',
    controller: 'ListCtrl',
    link: function(scope, element, attributes) {

    }
  }
})

.controller('ListCtrl', function($scope, AddSrv) {
  angular.extend($scope, {
    list: []
  });

  // add the example video to the list
  (function(videoUrl) {
    console.log(encodeURI(videoUrl));
  })('16 Stunning Tries From The June Internationals!.mp4')

  var addToList = function(event, params) {
    $scope.list.push(params.newSplice);
  };

  AddSrv.listen(addToList);
})
