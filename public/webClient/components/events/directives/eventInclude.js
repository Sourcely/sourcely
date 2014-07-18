angular.module("webClient").directive("eventInclude", function() {
  return {
    scope: {article: '='},
    restrict: "E",
    templateUrl: "webClient/components/events/templates/event.html",
    controller: "readerController"
  }
});
