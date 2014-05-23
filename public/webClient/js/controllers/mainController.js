app.controller('mainController', ['$scope', '$http', '$document', function($scope, $http, $document){

  $scope.open = false;

  $scope.collapseLeft = function() {
    app.setContentWidth($scope.open);
    $scope.open = !$scope.open;
    console.log($scope.open);
  };

}]);
