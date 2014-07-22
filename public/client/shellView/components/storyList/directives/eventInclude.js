angular.module("storyList")
.directive("eventInclude", function() {
  return {
    scope: {article: '='},
    restrict: "E",
    templateUrl: "client/shellView/components/storyList/directives/eventIncludeTemplate.html",
    controller: "eventInclude"
  }
});
