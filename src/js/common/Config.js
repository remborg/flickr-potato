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
        })
        .state('tags', {
            url: "/tags/:tags",
            views: {
                "main": {
                    templateUrl: "../partials/main.html"
                },
            }
        })
        .state('view', {
            url: "/view/:id",
            views: {
                "main": {
                    templateUrl: "../partials/main.html"
                },
                "popup": {
                    templateUrl: "../partials/popup.html"
                }
            }
        });
}

angular.module('potatoFeed')
    .config(['$stateProvider', '$urlRouterProvider', router]);
