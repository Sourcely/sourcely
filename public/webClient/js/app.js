var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/technology")
    $stateProvider
      .state('technology', {
        url: '/technology',
        views: {
          'content@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technologyController'
          },
          'mainReader@': {
            templateUrl: '/webClient/templates/mainReader.html',
            controller: 'technologyController'
          }
        }
        })

  app.setContentWidth = function(toggle) {
      if(toggle){
        document.getElementsByClassName('mainReader')[0].style.width= window.innerWidth - 450 + 'px';
      } else {
        document.getElementsByClassName('mainReader')[0].style.width= window.innerWidth + 'px';
      }  
    };

  app.setContentWidth(open);
  window.onresize = function(){
    app.setContentWidth(open);
  };
})



var openArticle = function ($scope, $modal, $log) {
  $scope.openLink = function (articleUrl, span) {
    document.getElementById('articleIFrame').src = articleUrl;
    console.log(span)
  };
  
};
