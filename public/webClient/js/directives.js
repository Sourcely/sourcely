angular.module("webClient").directive("eventInclude", function() {
  return {
      scope: {
        article: '=',
      },
      restrict: "E",
      templateUrl: "webClient/templates/event.html"
  }
});

angular.module("webClient").directive('activeLink', ['$state', function($state) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var activeClass = attrs.activeLink;
      var path = attrs.href;
      scope.location = location;
      scope.$watch('location.path()', function (newPath) {
        if (path === newPath) {
          setTimeout( function (){
            element.addClass(activeClass);
          });
        } else {
          element.removeClass(activeClass);

          setTimeout( function () {
            scope.$apply( function () {
              scope.$eval(attrs.remove);
            });
          }, 200);
        }
      });
    }
  };
}]);
