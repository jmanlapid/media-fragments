'use strict';

angular.module('video-splicer')

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

.controller('ListCtrl', function($scope, AddSrv, PlaySrv, ListSrv) {
  angular.extend($scope, {
    list: ListSrv.items,
    play: function(splice, playOriginal, playIndex) {
      console.log('settings ListSrv.playIndex to', playIndex);
      ListSrv.playIndex = playIndex;
      PlaySrv.broadcast(splice, playOriginal);
    },
    delete: function(index) {
      ListSrv.delete(index);
    }
  });

})
