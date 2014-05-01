var app = angular.module('webClient', ['ui.router'])

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

app.controller('categories', ['$scope', '$http', function($scope, $http){
  $scope.categories = ["games", "tech"];
}]);

app.controller('games', ['$scope', '$http', function($scope, $http){
  $scope.category = { name: "games", articles: [
                      {title: "man is trapped in oculus vr, believes real life is the virutal reality", author: "polygon"},
                      {title: "something about minecraft", author: "ign"}
                    ]};
}]);

app.controller('tech', ['$scope', '$http', function($scope, $http){
  $scope.category = {name: "tech", articles: [
                      {title: "man digs hole man finds gold", author: "nyt"},
                      {title: "spacex takes man to mars then kills him in a crash", author: "the verge"},
                      {title: "google cars can now sense cyclist gestures, what did they do before?", author: "brian"}
                    ]};
}]);
