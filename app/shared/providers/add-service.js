'use strict';

angular.module('app')

.service('AddSrv', function($rootScope) {
  this.broadcast = function(newSplice) {
    if (!newSplice) throw new Error ('Must pass a splice to the AddSrv.broadcast function');
    $rootScope.$broadcast("AddToList", { newSplice: newSplice });
  }

  this.listen = function(callback) {
    $rootScope.$on('AddToList', callback);
  }
})