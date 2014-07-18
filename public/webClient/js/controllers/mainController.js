app.controller('mainController', ['$scope', '$http', '$modal', '$rootScope', 'toggleUnread', '$window','resizeReader', function($scope, $http, $modal, $rootScope, toggleUnread, $window, resizeReader){

  $scope.open = false;

  $rootScope.loggedIn = $rootScope.loggedIn || false;

  $rootScope.accountName = $rootScope.accountName || "";

  $rootScope.readArticles = $rootScope.readArticles || [];

  $rootScope.readArticlesObject = $rootScope.readArticlesObject || {};

  $scope.signup = true;

  $scope.readingUnread = toggleUnread(false);

  $scope.signOut = function() {
    delete $window.localStorage.token;
    location.reload();
  };

  $scope.collapseLeft = function() {
    resizeReader($scope.open);
    $scope.open = !$scope.open;
  };

  $scope.openModal = function (logOrSign) {
    var modalInstance = $modal.open({
      controller: 'loginController',
      templateUrl: 'webClient/templates/'+ logOrSign +'.html',
      size: 'sm'
    });
  };

  $window.onresize = function(){
    resizeReader(open);
  };

}]);
