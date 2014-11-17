function mainController($scope, $stateParams, feedFactory) {
    var vm = this;

    $scope.getFeeds = function(tags) {
        $scope.loading = true;

        feedFactory.getFeed(tags).then(
            function(result) {
                if (result !== null) {
                    $scope.items = result.items;
                }
                $scope.loading = false;
            }
        );
    };
}

angular.module('potatoFeed', ['ui.router', 'ngAnimate'])
    .controller('mainController', ['$scope', '$stateParams', 'feedFactory', mainController]);
