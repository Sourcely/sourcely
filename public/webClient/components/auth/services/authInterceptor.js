angular.module('webClient')
.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = $window.localStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        console.log('token deleted');
      }
      return response || $q.when(response);
    }
  };
});
