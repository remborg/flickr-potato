function router($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider
    //.when('/contact/:id', '/contact/:id')
        .otherwise("/");
        
    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "main": {
                    templateUrl: "../partials/main.html"
                }
            }
        });
}

angular.module('ContactApp')
    .config(['$stateProvider', '$urlRouterProvider', router]);
