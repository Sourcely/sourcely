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
        url: '/technology',
        views: {
          'left@': {
            templateUrl: 'webClient/templates/leftBar.html',
            controller: 'categories'
          },
          'right@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technology'
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
      });

})
