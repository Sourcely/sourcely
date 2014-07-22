angular.module('shellView', [
  'auth',
  'storyList',
  'reader'
])

.config(function($stateProvider) {
  $stateProvider
  .state('shellView', {
    url: '',
    views: {
      '': {
        templateUrl: '/client/shellView/shellView.html',
        controller: 'shellView'
      },
      'storyList@shellView': {
        templateUrl: '/client/shellView/components/storyList/storyList.html',
        controller: 'storyList'
      },
      'reader@shellView': {
        templateUrl: '/client/shellView/components/reader/reader.html',
        controller: 'reader'
      },
      'dropDown@shellView': {
        templateUrl: '/client/shellView/components/auth/dropDown/dropDown.html',
        controller: 'dropDown'
      }
    }
  }
});
