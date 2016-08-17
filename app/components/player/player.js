'use strict';

angular.module('video-splicer')

.directive('player', function() {
  var template = [
    '<h2>Now Playing: {{data.splice.name}}</h2>',
    '<i class="fa fa-spinner fa-spin" style="font-size:100px" ng-show="data.loading"></i>',
    '<div class="embed-responsive embed-responsive-16by9">',
    '<video ng-show="!data.loading" id="video" class="embed-responsive-item" controls preload="metadata" width="200px" height="200px">',
    '</video>'
  ].join('');
  return {
    template: template,
    restrict: 'E',
    scope: false,
    controller: 'PlayerCtrl',
    link: function(scope, element, attributes) {

    }
  }
})

//http://jsfiddle.net/dsbonev/cCCZ2/embedded/result,js,html,css/

.controller('PlayerCtrl', function($scope, $timeout, PlaySrv, ListSrv) {
  var video = document.getElementById('video');

  angular.extend($scope, {
    data: {
      loading: false,
      srcOriginal: 'app/assets/vid/rugby-tries.mp4',
      src: 'app/assets/vid/rugby-tries.mp4',
      splice: {},
      nowPlaying: false
    }
  });

  video.src = $scope.data.srcOriginal;
  video.load();

  function onPause() {
    // when a video pauses, we need to know if its the end of the clip, if so play the next one
    console.log(video.currentTime, $scope.data.splice.end);
    if (video.currentTime >= $scope.data.splice.end) {
      playNextVideo();
    } else {
      $timeout(function() {
        $scope.data.nowPlaying = false;
      });
    }
  };

  function playNextVideo() {
    var nextSplice = ListSrv.getNextClip();
    console.log('nextSplice', JSON.stringify(nextSplice));
    if (nextSplice) play(null, { splice: nextSplice, playOriginal: false} );
  };

  function playPreviousVideo() {
    var previousSplice = ListSrv.getPreviousClip();
    if (previousSplice) play(null, { splice: previousSplice, playOriginal: false} );
  }

  function keyDown(event) {
    // left arrowkey plays previous video
    if (event.keyCode === 37) {
      playPreviousVideo(); 
      return false;
    // right arrowkey
    } else if(event.keyCode === 39) {
      playNextVideo();
      return false;
    }
  }

  function play(event, params) {
    video.pause();
    video.src = '';

    console.log('play w/ params.splice', JSON.stringify(params.splice));
    var splice = params.splice;
    var playOriginal = params.playOriginal;
    $scope.data.nowPlaying = true;
    $scope.data.splice = params.splice;
    if (playOriginal) {
      video.src = $scope.data.srcOriginal;
      $scope.data.splice.name = 'Original';
    } else {
      video.src = $scope.data.srcOriginal + '#t=' + splice.start + ',' + splice.end;
    }
    $scope.data.loading = true;
    $timeout();
    video.load();
    $timeout(function() {
      $scope.data.loading = false;
      video.play();
    }, 3000);
  };

  video.addEventListener('pause', onPause);
  document.addEventListener('keydown', keyDown);
  PlaySrv.listen(play);
})
