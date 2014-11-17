function feedFactory($http, $filter, $q) {
    var feedUrl = 'http://api.flickr.com/services/feeds/photos_public.gne';
    var factory = {
        feedTag: null,
        feedData: null,
        getFeed: function(tags) {
            var deffered = $q.defer();
            if (tags !== undefined && tags !== factory.feedTag) {
                $http({
                        method: 'JSONP',
                        url: feedUrl,
                        params: {
                            'jsoncallback': 'JSON_CALLBACK',
                            'tagmode': 'all',
                            'format': 'json',
                            'tags': tags
                        }
                    })
                    .then(function(response) {
                            //angular.extend(factory.feedData, response.data);
                            factory.feedData = response.data;
                            factory.feedTag = tags;
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
        },
        getItem: function(itemId) {
            var deffered = $q.defer();
            factory.getFeed().then(
                function(result) {
                    var item = null;
                    if (result !== null) {
                        item = result.items[itemId];
                    }
                    deffered.resolve(item);
                },
                function(data, status, headers, config) {
                    console.log(data, status, headers, config);
                    deffered.reject('Error: Can\'t retrieve data');
                }
            );
            return deffered.promise;

        }
    };
    return factory;
}

angular.module('potatoFeed')
    .factory('feedFactory', ['$http', '$filter', '$q', feedFactory]);
