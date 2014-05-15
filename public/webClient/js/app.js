var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tech")
    $stateProvider
      .state('tech', {
        url: '/tech',
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

  $scope.openLink = function (articleUrl) {
    document.getElementById('articleIFrame').src = articleUrl;
  };
};
