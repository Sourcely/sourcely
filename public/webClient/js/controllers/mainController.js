app.controller('mainController', ['$scope', '$http', '$modal', '$rootScope', 'toggleUnread', function($scope, $http, $modal, $rootScope, toggleUnread){

  $scope.open = false;

  $rootScope.loggedIn = false;

  $rootScope.accountName = "";

  $rootScope.readArticles = [];

  $rootScope.readArticlesObject = $rootScope.readArticlesObject || {};

  $scope.signup = true;

  $scope.readingUnread = toggleUnread(false);

  $scope.collapseLeft = function() {
    app.setContentWidth($scope.open);
    $scope.open = !$scope.open;
    console.log($scope.open);
  };

  $scope.openModal = function (logOrSign) {
    var modalInstance = $modal.open({
      controller: 'loginController',
      templateUrl: 'webClient/templates/'+ logOrSign +'.html',
      size: 'sm'
    });
  };

}]);
