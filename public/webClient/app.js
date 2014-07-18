angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

angular.module('webClient').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $urlRouterProvider.otherwise("");
  $stateProvider
  .state('main', {
    url: '',
    views: {
      '': {
        templateUrl: '/webClient/components/main.html',
        controller: 'mainController'
      },
      'events@main': {
        templateUrl: '/webClient/components/events/templates/eventList.html',
        controller: 'contentController'
      },
      'mainReader@main': {
        templateUrl: '/webClient/components/reader/templates/mainReader.html',
        controller: 'mainReaderController'
      },
      'dropDown@main': {
        templateUrl: '/webClient/components/auth/templates/dropDown.html',
        controller: 'dropDownController'
      }
    }
  });

});

angular.module('webClient').run(function($http, $rootScope, $window) {
  if($window.localStorage.token){
    $http.post('/api/authenticate', {authType: 'run-onload'}).success(function(data) {
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;
      $rootScope.readArticlesObject = {};
    })
  }
});
