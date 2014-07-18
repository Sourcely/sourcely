angular.module('webClient').controller('loginController', ['$scope', '$http','$modalInstance', '$rootScope', '$window', function($scope, $http, $modalInstance, $rootScope, $window){
  $scope.signup = true;
  $scope.credentials = {
    username: '',
    readArticles: ''
  };

  $scope.loginData = function(credentials){    
    $http.post('/login', credentials).success(function(data) {      
      $window.localStorage.token = data.token;
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;        
      for(var i = 0; i < $rootScope.readArticles.length; i++){
        $rootScope.readArticlesObject[$rootScope.readArticles[i]] = true;
      }        
      $modalInstance.dismiss('cancel');        
    })
    .error(function() {
      delete $window.localStorage.token;
      console.log("login failed, existing token deleted");
    });
  };

  $scope.signupData = function(credentials){
    $http.post('/signup', credentials).success(function(data) {      
      $window.localStorage.token = data.token;
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;
      $modalInstance.dismiss('cancel');    
    })
    .error(function() {
      delete $window.localStorage.token;
      console.log("signup failed, existing token deleted");
    });
  };
}]);
