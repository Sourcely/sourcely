angular.module('webClient')
.factory('resizeReader', function ($rootScope, $q, $window) {
  return function(toggle) {
    if(toggle){
      document.getElementsByClassName('mainReader')[0].style.width = window.innerWidth - 450 + 'px';
    } else {
      document.getElementsByClassName('mainReader')[0].style.width = window.innerWidth - 40 + 'px';
    }
  };
});
