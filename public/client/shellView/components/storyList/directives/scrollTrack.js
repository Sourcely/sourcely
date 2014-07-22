angular.module("storyList")
.directive("scrollTrack", function() {
  return function(scope, elm, attr) {
    var raw = elm[0];
    elm.bind('scroll', function() {
      var classes = document.getElementsByClassName('newsHeader');
      if (raw.scrollTop > 1) {
        classes[0].className = 'newsHeader hasShadow';
      } else {
        classes[0].className = 'newsHeader';
      }
    });
  }
});
