angular.module('app')

.factory('ListSrv', function($q, localStorageService) {
  var svc = {};
  svc.items = localStorageService.get('items') || []; // get from local storage else default to array
  svc.playIndex = 0; // the play index referenced from player when using arrow keys and continuous play

  svc.setLocalStorage = function() {
    localStorageService.set('items', svc.items);
  };

  svc.add = function(splice) {
    svc.items.push(splice);
    svc.setLocalStorage();
  };

  svc.delete = function(index) {
    svc.items.splice(index, 1);
    svc.setLocalStorage();
  };

  svc.saveEdits = function(scopedItem, data) {
    angular.extend(scopedItem, {
      editing: false,
      name: data.name,
      start: data.start,
      end: data.end
    });
    svc.setLocalStorage();
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


