var app = angular.module('webClient', [
  'ui.router',
  'ui.bootstrap'
]);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/tech")
    $stateProvider
      .state('tech', {
        url: '/tech',
        views: {
          'content@': {
            templateUrl: 'webClient/templates/reader.html',
            controller: 'technology'
          },
          'mainReader@': {
            templateUrl: '/webClient/templates/mainReader.html',
            controller: 'technology'
          }
        }
        })
})

var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size, theLink) {

    var modalInstance = $modal.open({
      // templateUrl: "modal.html",
      template: "<iframe src="+theLink+"></iframe>",
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

  $scope.openLink = function (articleUrl) {
    document.getElementById('articleIFrame').src = articleUrl;
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

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
