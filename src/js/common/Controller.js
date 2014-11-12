function mainController($scope, $stateParams, feedFactory) {
    var vm = this;

    $scope.loading = true;
    console.log('mainController');
    
    feedFactory.getFeed().then(
        function(result) {
            $scope.items = result.items;
      		$scope.loading = false;
            console.log('$scope.items', $scope.items);
        }
    );
	
}

angular.module('potatoFeed', ['ui.router', 'ngAnimate'])
    .controller('mainController', ['$scope', '$stateParams', 'feedFactory', mainController]);
