var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/topStories");
    $stateProvider
      .state('topStories', {
        url: '/topStories',
        views: {
          'content@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technologyController'
          },
          'mainReader@': {
            templateUrl: '/webClient/templates/mainReader.html',
            controller: ''
          }
        }
        });
      
  app.setContentWidth = function(toggle) {
      if(toggle){
        document.getElementsByClassName('mainReader')[0].style.width = window.innerWidth - 450 + 'px';
      } else {
        document.getElementsByClassName('mainReader')[0].style.width = window.innerWidth - 40 + 'px';
      }  
    };

  app.setContentWidth(open);
  window.onresize = function(){
    app.setContentWidth(open);
  };
  
})
