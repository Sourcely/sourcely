app.controller('reader', ['$scope', '$http', function($scope, $http){

  $scope.openLink = function (articleUrl, collectionID) {
    document.getElementById('articleIFrame').src = articleUrl;
    $http.post('/markread', collectionID).success(console.log("collection: ", collectionID + " has been marked as read"));
  };  

}]);
