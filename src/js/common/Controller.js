function mainController($scope, $stateParams) {
    var vm = this;
}

angular.module('ContactApp', ['ui.router'])
    .controller('mainController', ['$scope', '$stateParams', mainController]);
