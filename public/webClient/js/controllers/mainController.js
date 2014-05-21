app.controller('mainController', ['$scope', '$http', function($scope, $http){

  $scope.open = false;

  $scope.collapseLeft = function() {
    app.setContentWidth($scope.open);
    $scope.open = !$scope.open;
    console.log($scope.open);
  };

}]);
