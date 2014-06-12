var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.factory('authInterceptor', function ($rootScope, $q, $window) {
  console.log($window.localStorage.token);
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = $window.localStorage.token;
      }
      // console.log(config);
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // $window.localStorage;
        console.log('token deleted');
      }
      return response || $q.when(response);
    }
  };
});

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
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
  
});

app.run(function($http, $rootScope, $window) {
  $window.localStorage.token = $window.localStorage.token || "";
  var getArticles = function() {
    $http({ method:'GET',
              url:'/technology'
           }).success(function(data,status,headers,config){      
             var timeSortedArticles = [];
             for(var articleCluster in data){
              var tempArticle=[];
              for (var key in data[articleCluster]){
                if(data[articleCluster][key][0]){
                  var articleCluster = data[articleCluster][key][0]['collectionID'];
                  $rootScope.readArticlesObject[articleCluster] = false;
                };
                tempArticle.push(data[articleCluster][key]);
              }
              timeSortedArticles.push(tempArticle);
             }
             timeSortedArticles.sort(function(a,b){
              return b[1]-a[1];
             });          
             $rootScope.category.articles = timeSortedArticles;           
           }).error(function(err,status,headers,config){
             console.log("error: ", err);
           });
  };

  if($window.localStorage.token.length>0){    
    $http.post('/api/authenticate', {authType: 'run-onload'}).success(function(data) {    
      $rootScope.loggedIn = true;
      $rootScope.accountName = data.username;
      $rootScope.readArticles = data.readArticles;
      $rootScope.readArticlesObject = {};
      for(var i = 0; i < $rootScope.readArticles.length; i++){
        $rootScope.readArticlesObject[$rootScope.readArticles[i]] = true;
      }
    })
    .error(function() {    
      getArticles();
    });
  } else {
    getArticles();
  }
});
