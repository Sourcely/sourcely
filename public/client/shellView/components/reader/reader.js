angular.module('reader', [])

.controller('reader', ['resizeReader', function(resizeReader){
  resizeReader(true);
}]);
