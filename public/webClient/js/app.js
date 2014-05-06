var app = angular.module('webClient', [
  'ui.router'
]);

app.config(function($stateProvider) {

    $stateProvider
      .state('categories', {
        url: '',
        views: {
          'left@': {
            templateUrl: 'webClient/templates/leftBar.html',
            controller: 'categories'
          },
          'right@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'categories'
          }
        }
      })
      .state('tech', {
        url: '/tech',
        views: {
          'left@': {
            templateUrl: 'webClient/templates/leftBar.html',
            controller: 'categories'
          },
          'right@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'tech'
          }
        }
      })
      .state('games', {
        url: '/games',
        views: {
          'left@': {
            templateUrl: 'webClient/templates/leftBar.html',
            controller: 'categories'
          },
          'right@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'games'
          }
        }
      })
});

app.controller('categories', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.categories = ["games", "tech"];
  techFactory.retrieveTechArticles();
}]);

app.controller('games', ['$scope', '$http', function($scope, $http){
  $scope.category = { name: "games", articles: [
                      {title: "man is trapped in oculus vr, believes real life is the virutal reality", author: "polygon"},
                      {title: "something about minecraft", author: "ign"}
                    ]};
}]);

app.controller('tech', ['$scope', '$http', 'techFactory', function($scope, $http, techFactory){
  $scope.category = {name:"tech", articles: []};
  $scope.category.articles = techFactory.getTechArticles();
}]);
