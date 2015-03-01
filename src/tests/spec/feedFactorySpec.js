describe('potatoFeed app', function() {

    var $controller;
    var $http;
    var stateparams = {
        id: null,
        tags: null
    };

    var feedFactory;

    var mockFeed = {
        title: "Recent Uploads tagged potato",
        generator: "http://www.flickr.com/",
        items: [{
            title: "mussels for dinner: eat quickly",
            link: "http://www.flickr.com/photos/32998163@N00/16063801443/",
            media: {
                m: "http://farm9.staticflickr.com/8565/16063801443_f35a3a92e4_m.jpg"
            },
            date_taken: "2015-03-01T07:48:29-08:00",
            description: " <p><a href=\"http://www.flickr.com/people/32998163@N00/\">Just Back<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/32998163@N00/16063801443/\" title=\"mussels for dinner: eat quickly\"><img src=\"http://farm9.staticflickr.com/8565/16063801443_f35a3a92e4_m.jpg\" width=\"240\" height=\"180\" alt=\"mussels for dinner: eat quickly\" /><\/a><\/p> ",
            published: "2015-03-01T15:50:21Z",
            author: "nobody@flickr.com (Just Back)",
            author_id: "32998163@N00",
            tags: "food shells dinner table evening salad essen cook frites potato fries ready mussels bowls valves mollusc kichen mollusk bivalve"
        }, {
            title: "oven-baked fries",
            link: "http://www.flickr.com/photos/32998163@N00/16682742232/",
            media: {
                m: "http://farm9.staticflickr.com/8657/16682742232_b56ab0fbe6_m.jpg"
            },
            date_taken: "2015-03-01T07:49:10-08:00",
            description: " <p><a href=\"http://www.flickr.com/people/32998163@N00/\">Just Back<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/32998163@N00/16682742232/\" title=\"oven-baked fries\"><img src=\"http://farm9.staticflickr.com/8657/16682742232_b56ab0fbe6_m.jpg\" width=\"240\" height=\"180\" alt=\"oven-baked fries\" /><\/a><\/p> ",
            published: "2015-03-01T15:50:19Z",
            author: "nobody@flickr.com (Just Back)",
            author_id: "32998163@N00",
            tags: "food dinner table evening oven cook crisp potato carbs mussels baked mollusc kichen mollusk solanum bivalve gebackt"
        }]
    };

    beforeEach(function() {

        module('potatoFeed');

        inject(function($rootScope, _$controller_, _$httpBackend_, $injector) {
            var scope = $rootScope.$new();
            feedFactory = $injector.get('feedFactory');
            $http = _$httpBackend_;

            $controller = _$controller_('mainController', {
                $scope: scope,
                $stateparams: stateparams,
                feedFactory: feedFactory
            });
        });

    });

    /*
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get("$rootScope");
        $scope = $rootScope.$new();
        $location = $injector.get("$location");
        $httpBackend = $injector.get("$httpBackend");
        $controller = $injector.get("$controller");
        $window = $injector.get("$window");
    }));*/

    describe("feedFactory", function() {
        it("gets the feeds", function(done) {


            var testFeed = function(feedData) {
                expect(feedData.title).toBe(mockFeed.title);
                expect(feedData.generator).toBe(mockFeed.generator);
            };

            var failTest = function(feedData) {
                expect(feedData).toBeUndefined();
            };

            $http.expectJSONP('http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tagmode=all&tags=potato').respond(200, mockFeed);

            feedFactory.getFeed("potato")
                .then(testFeed)
                .catch(failTest)
                .finally(done);

            $http.flush();
        });

    });

});
