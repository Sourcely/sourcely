app.controller('loginController', ['$scope', '$http','$modalInstance', '$rootScope', function($scope, $http, $modalInstance, $rootScope){
  $scope.signup = true;
  $scope.credentials = {
    username: '',
    readArticles: ''
  };
  $scope.loginData = function(credentials){
    $http.post('/login', credentials).success(function(data) {
      console.log(data);
      if(data.authorized){
        console.log("data is true: ", data);
        $rootScope.loggedIn = true;
        $modalInstance.dismiss('cancel');
      }
    });  
  }

}]);
