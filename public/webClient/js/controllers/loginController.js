app.controller('loginController', ['$scope', '$http','$modalInstance', function($scope, $http, $modalInstance){
  $scope.signup = true;
/*  $scope.test= function(){
    console.log("from login controller")
    console.log(arguments);
  };
  $scope.login = function (username, password) {
    var user = {username: username, password: password};
    $http.post('/login', user).success(console.log("user ", user.username + " has been logged in"));  
  };  */
}]);
