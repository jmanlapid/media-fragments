'use strict';

angular.module('app')

.filter('secondsToDateTime', function() {
    return function(seconds) {
        var d = new Date(0,0,0,0,0,0,0);
        d.setSeconds(seconds);
        return d;
    };
})

.directive('list', function() {
  var template = [
    '<h2>List</h2>',

    '<div>',
      '<h4>Original</h4>',
      '<button ng-click="play(item, true)">Play</button>',
    '</div><hr>',
    
    '<div ng-repeat="item in list">',
      '<div ng-if="item.editing">',
        '<edit item="item"></edit>',
      '</div>',

      '<div ng-if="!item.editing">',
        '<h4>{{item.name}}</h4>',
        '<h5>{{item.start | secondsToDateTime | date:"mm:ss"}} - {{item.end | secondsToDateTime| date:"mm:ss"}}</h5>',
        '<div ng-if="!isEmptyObj(item.tags)"><span class="h5">Tags: </span><span ng-repeat="(key,val) in item.tags">{{key}}{{$last ? "": ", "}}</span><br><br></div>',
        '<button ng-click="play(item, false, $index)">Play</button>',
        '<button ng-click="item.editing = true">Edit</button>',
        '<button ng-click="delete($index)">Delete</button><br><br>',
      '</div>',
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

.controller('ListCtrl', function($scope, PlaySrv, ListSrv) {
  angular.extend($scope, {
    list: ListSrv.getItems(),
    play: function(splice, playOriginal, playIndex) {
      console.log('settings ListSrv.playIndex to', playIndex);
      ListSrv.playIndex = playIndex;
      PlaySrv.broadcast(splice, playOriginal);
    },
    delete: function(index) {
      ListSrv.delete(index);
    },
    isEmptyObj: function(obj) {
      if (!obj) return true;
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  });

  $scope.$watch(function() { return ListSrv.getItems(); }, function(newList) {
    console.log('$scope.watch w/ newList', JSON.stringify(newList));
    $scope.list = newList;
  }, true);

})
