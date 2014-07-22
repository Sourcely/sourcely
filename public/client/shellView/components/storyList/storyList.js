angular.module('storyList', [])

.config(function($stateProvider) {
  $stateProvider
  .state('storyList', {
    url: '',
    views:
      'storyList@shellView': {
        templateUrl: '/client/shellView/components/storyList/storyList.html',
        controller: 'storyList'
      }
    });
});
