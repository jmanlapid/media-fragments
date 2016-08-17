angular.module('video-splicer')

.factory('ListSrv', function($q) {
  var svc = {};
  svc.items = [];
  svc.playIndex = 0;

  svc.add = function(splice) {
    svc.items.push(splice);
  };

  svc.delete = function(index) {
    svc.items.splice(index, 1);
  };

  svc.getNextClip = function() {
    console.log('invoked getNextClip w/ playIndex', svc.playIndex, 'svc.items.length', svc.items.length);
    if (svc.playIndex === svc.items.length) {
      return false;
    } else {
      svc.playIndex += 1;
      console.log('result getNextClip w/ playIndex', svc.playIndex);
      return svc.items[svc.playIndex];
    }
  };

  svc.getPreviousClip = function() {
    console.log('invoked getPreviousClip w/ playIndex', svc.playIndex, 'svc.items.length', svc.items.length);
    if (svc.playIndex === 0 || !svc.items.length) {
      return false;
    } else {
      svc.playIndex -= 1;
      console.log('result getPreviousClip w/ playIndex', svc.playIndex);
      return svc.items[svc.playIndex]
    }
  };

  return svc;
});


