angular.module('client', [
  'ui.router',
  'ui.bootstrap',
  'shellView'
]);

angular.module('client').run(function($http, $rootScope, $window) {
  if($window.localStorage.token){
    $http.post('/api/authenticate', {authType: 'run-onload'}).success(function(data) {
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;
      $rootScope.readArticlesObject = {};
    })
  }
});
