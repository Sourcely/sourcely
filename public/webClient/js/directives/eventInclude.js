angular.module("webClient").directive("eventInclude", function() {
  return {
      scope: {article: '='},
      restrict: "E",
      templateUrl: "webClient/templates/event.html"
  }
});
