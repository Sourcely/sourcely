angular.module("webClient").directive("lazyLoad", function() {
  return function(scope, elm, attr) {
    var raw = elm[0];
    elm.bind('scroll', function() {
      if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
        scope.$apply(attr.lazyLoad);
      }
      var classes = document.getElementsByClassName('newsHeader');
      if (raw.scrollTop > 1) {        
        classes[0].className = 'newsHeader hasShadow';
      } else {        
        classes[0].className = 'newsHeader';        
      }
    });
  }
});