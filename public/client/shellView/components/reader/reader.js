angular.module('reader', [])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('reader', {
    url: '',
    views:
      'reader@main': {
        templateUrl: '/client/shellView/components/reader/reader.html',
        controller: 'reader'
      }
    });
})

.controller('reader', ['resizeReader', function(resizeReader){
  resizeReader(true);
}]);
