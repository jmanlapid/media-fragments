'use strict';

angular.module('app')

.directive('edit', function($timeout, ListSrv) {
  var template = [
    '<h3>Editing {{original.name}}</h3>',
    '<input type="text" ng-model="data.name" placeholder="{{original.name}}"/ ><br>',
    '<input type="number" ng-model="data.start" min="0" placeholder="{{original.start}}"/ ><br>',
    '<input type="number" ng-model="data.end" min="0" placeholder="{{original.end}}"/ ><br>',
    '<button ng-click="save(data)" ng-disabled="disabled(data)">save</button>',
    '<button ng-click="item.editing = false ">Cancel</button>'
  ].join('');

  return {
    template: template,
    restrict: 'E',
    scope: {
      item: '=item'
    },
    link: function(scope, element, attributes) {
      
      angular.extend(scope, {
        data: scope.item,
        original: scope.item,
        save: function(data) {
          $timeout(function() {
            ListSrv.saveEdits(scope.item, data);
          });
        },
        disabled: function(newSplice) {
          return newSplice.name === undefined ||
            newSplice.start === undefined ||
            newSplice.end === undefined;
        }
      }); 
    }
  }
})
