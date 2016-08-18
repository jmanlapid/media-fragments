'use strict';

angular.module('app')

.factory('ListSrv', function($q, localStorageService) {
  var svc = {};
  var items = localStorageService.get('items') || []; // get from local storage else default to array
  svc.playIndex = 0; // the play index referenced from player when using arrow keys and continuous play

  svc.getItems = function() { 
    return items;
  };

  svc.loadFromLocalStorage = function() {
    items = localStorageService.get('items') || [];
    return;
  };

  svc.tagPropertiesToArray = function(tagsObj) {
    var tagsArr = [];
    for (var property in tagsObj) {
      if (tagsObj.hasOwnProperty(property)) {
        tagsArr.push(property);
      }
    }
    return tagsArr;
  };

  svc.filterListByTags = function(tags) {
    svc.loadFromLocalStorage();
    var filteredList = [];
    if (!tags) return;
    if (!Array.isArray(tags)) throw new Error('ListSrv.filterTags first param should be an array of strings');
    items.forEach(function(item, index) {
      var match = true
      tags.forEach(function(tag) {
        if (!item.tags[tag]) {
          match = false;
          return;
        }
      });
      if (match) filteredList.push(item);
    });
    items = filteredList;
  };

  svc.parseTags = function(splice) {
    var tagsObj = {};
    if (splice.tags && splice.tags.length) {
      if (typeof splice.tags === 'string') {
        splice.tags = splice.tags.split(',');
      }
      splice.tags.forEach(function(tag, index) {
        tag = tag.trim();
        if (tag && tag.length) {
          tagsObj[tag] = true;
        }
      });
      splice.tags = tagsObj;
    }
    console.log(JSON.stringify(splice.tags));
    return splice;
  };

  svc.setLocalStorage = function() {
    localStorageService.set('items', items);
  };

  svc.add = function(splice) {
    svc.parseTags(splice);
    items.push(splice);
    svc.setLocalStorage();
  };

  svc.delete = function(index) {
    items.splice(index, 1);
    svc.setLocalStorage();
  };

  svc.saveEdits = function(scopedItem, data) {
    svc.parseTags(data);
    angular.extend(scopedItem, {
      editing: false,
      name: data.name,
      start: data.start,
      end: data.end,
      tags: data.tags
    });
    svc.setLocalStorage();
  };

  svc.getNextClip = function() {
    console.log('invoked getNextClip w/ playIndex', svc.playIndex, 'items.length', items.length);
    if (svc.playIndex === items.length) {
      return false;
    } else {
      svc.playIndex += 1;
      console.log('result getNextClip w/ playIndex', svc.playIndex);
      return items[svc.playIndex];
    }
  };

  svc.getPreviousClip = function() {
    console.log('invoked getPreviousClip w/ playIndex', svc.playIndex, 'items.length', items.length);
    if (svc.playIndex === 0 || !items.length) {
      return false;
    } else {
      svc.playIndex -= 1;
      console.log('result getPreviousClip w/ playIndex', svc.playIndex);
      return items[svc.playIndex]
    }
  };
  return svc;
});
