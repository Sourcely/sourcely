app.controller('loginController', ['$scope', '$http','$modalInstance', '$rootScope', function($scope, $http, $modalInstance, $rootScope){
  $scope.signup = true;
  $scope.credentials = {
    username: '',
    readArticles: ''
  };
  $scope.loginData = function(credentials){
    $http.post('/login', credentials).success(function(data) {
      if(data.authorized){
        $rootScope.loggedIn = true;
        $rootScope.accountName = data.username;
        $rootScope.readArticles = data.readArticles;
        var readArticlesArray = data.readArticles
        for(var i = 0; i < readArticlesArray.length; i++){
          $rootScope.readArticlesObject[readArticlesArray[i]] = true;
        }
        console.log($rootScope.readArticlesObject);
        $modalInstance.dismiss('cancel');
      }
    });
  }
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
