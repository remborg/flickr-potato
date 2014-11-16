function itemController($scope, $stateParams, feedFactory) {
    var vm = this;

    var itemId = $stateParams.id || 0;

    $scope.loading = true;
    console.log('itemController');

    feedFactory.getItem(itemId).then(
        function(result) {
            $scope.item = result;
            $scope.loading = false;

            // getting description string
            var descArray = result.description.split('<p>');
            var descString = descArray[descArray.length - 1];
            var strippedString = descString.replace(/(<([^>]+)>)/ig, "");
            $scope.description = strippedString;

            $scope.tags = result.tags.split(' ');
        }
    );

}

angular.module('potatoFeed')
    .controller('itemController', ['$scope', '$stateParams', 'feedFactory', itemController]);
