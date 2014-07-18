angular.module('webClient').controller('readerController', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  var iframe = document.getElementById('articleIFrame');
  $scope.openLink = function (articleUrl, collectionID) {
    iframe.src = articleUrl;
    var collection = {clusterId: collectionID, username: $rootScope.accountName};
    if($rootScope.loggedIn){
      $http.post('/api/markread', collection)
      .success(function(){
        if($rootScope.readArticles.indexOf(collection.clusterId)===-1){
            $rootScope.readArticles.push(collection.clusterId);
        }
      }).error(function(data, status, headers, config) {
        console.log("error: ", data);
      });
    }
  };
}]);
