var app = angular.module('webClient', [
  'ui.router'
]);

app.config(function($stateProvider) {

    $stateProvider
      .state('tech', {
        url: '',
        views: {
          'content@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technology'
          }
        }
      })
})
