app.controller('mainController', ['$scope', '$http', '$modal', '$rootScope', function($scope, $http, $modal, $rootScope){

  $scope.open = false;

  $rootScope.loggedIn = false;

  $rootScope.accountName = "";

  $scope.signup = true;

  $scope.collapseLeft = function() {
    app.setContentWidth($scope.open);
    $scope.open = !$scope.open;
    console.log($scope.open);
  };

  $scope.openModal = function (logOrSign) {
    console.log(logOrSign);
    var modalInstance = $modal.open({
      controller: 'loginController',
      templateUrl: 'webClient/templates/'+ logOrSign +'.html',
      size: 'sm'
    });
  };

}]);
