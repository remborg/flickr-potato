function item($state, $stateParams) {
    return function(scope, element, attrs) {
        var tags = $stateParams.tags;

        if (scope.items === undefined) {
            tags = 'potato';
            $state.go('home');
        }
        scope.getFeeds(tags);
    };
}

angular.module('potatoFeed')
    .directive('item', ['$state', '$stateParams', item]);
