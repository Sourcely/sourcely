var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/technology")
    $stateProvider
      .state('technology', {
        url: '/technology',
        views: {
          'content@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technology'
          },
          'mainReader@': {
            templateUrl: '/webClient/templates/mainReader.html',
            controller: 'technology'
          }
        }
        })
})

var openArticle = function ($scope, $modal, $log) {

  $scope.openLink = function (articleUrl, span) {
    document.getElementById('articleIFrame').src = articleUrl;
    console.log(span)
  };
};
