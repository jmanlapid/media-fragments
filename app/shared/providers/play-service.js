angular.module('video-splicer')

.service('PlaySrv', function($rootScope) {
  this.broadcast = function(splice, playOriginal) {
    if (playOriginal === true) {
      return $rootScope.$broadcast("PlaySplice", { playOriginal: playOriginal, splice: {} });
    }
    if (!splice) {
      throw new Error ('Must pass a splice to the PlaySrv.broadcast function');
    } 
    $rootScope.$broadcast("PlaySplice", { splice: splice });
  }

  this.listen = function(callback) {
    $rootScope.$on('PlaySplice', callback);
  }
})