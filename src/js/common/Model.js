function feedFactory($http, $filter, $q) {
    var feedUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json';
    var factory = {
        feedData: null,
        getFeed: function() {
            var deffered = $q.defer();
            if (factory.feedData === null) {
                $http({
                        method: 'JSONP',
                        url: feedUrl,
                        params: {
                            'jsoncallback': 'JSON_CALLBACK'
                        }
                    })
                    .then(function(response) {
                            factory.feedData = response.data;
                            deffered.resolve(factory.feedData);
                        },
                        function(data, status, headers, config) {
                            console.log(data, status, headers, config);
                            deffered.reject('Error: Can\'t retrieve data');
                        }
                    );
            } else {
                deffered.resolve(factory.feedData);
            }
            return deffered.promise;
        }
    };
    return factory;
}

angular.module('potatoFeed')
    .factory('feedFactory', ['$http', '$filter', '$q', feedFactory]);
