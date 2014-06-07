app.controller('loginController', ['$scope', '$http','$modalInstance', '$rootScope', '$window', function($scope, $http, $modalInstance, $rootScope, $window){
  $scope.signup = true;
  $scope.credentials = {
    username: '',
    readArticles: ''
  };
  $scope.loginData = function(credentials){
    $http.
      post('/login', credentials).success(function(data) {
        $window.sessionStorage.token = data.token;
        // if(data.authorized){
        console.log("token: ", token);
        $rootScope.loggedIn = true;
        $rootScope.accountName = data.username;
        $rootScope.readArticles = data.readArticles;
        var readArticlesArray = data.readArticles
        for(var i = 0; i < readArticlesArray.length; i++){
          $rootScope.readArticlesObject[readArticlesArray[i]] = true;
        }
        console.log($rootScope.readArticlesObject);
        $modalInstance.dismiss('cancel');
        // }
      })
      .error(function() {
        delete $window.sessionStorage.token;
        console.log("login failed, token deleted");
      });
  };

  $scope.signupData = function(credentials){
    $http.post('/signup', credentials).success(function(data) {
      if(data.authorized){
        $rootScope.loggedIn = true;
        $rootScope.accountName = data.username;
        $rootScope.readArticles = data.readArticles;
        $modalInstance.dismiss('cancel');
      }
    });
  };
}]);
