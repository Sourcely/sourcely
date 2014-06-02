var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/topStories")
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
        })

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
  
  var LoginModal = function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  };

  var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
  
})
