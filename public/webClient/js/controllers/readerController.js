app.controller('reader', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){

  $scope.openLink = function (articleUrl, collectionID) {
    document.getElementById('articleIFrame').src = articleUrl;
    var collection = {clusterId: collectionID, username: $rootScope.accountName};
    if($rootScope.loggedIn){
      $http.post('/markread', collection).success(console.log("collection: ", collectionID + " has been marked as read"));  
    }
  };  
  
}]);
