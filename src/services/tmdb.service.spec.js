describe("tmdb service", function () {
    var Tmdb;
    var $httpBackend;
    var $rootScope;

    // TODO: Move these mocks and hardcodes into separate modules
    var API_BASE = 'http://api.themoviedb.org/3/search/movie';
    var API_QUERY_BASE = API_BASE + '?api_key=42b3e60b6636f50062f6d3579100d83f&query=';
    var API_MOCK_RESPONSE = {
        "page":1,
        "results":[ {
                 "adult":false,
                 "backdrop_path":"/yscuj7b2mwRb37ZZwgD3HBaXGuY.jpg",
                 "id":33061,
                 "original_title":"Troll",
                 "release_date":"1986-01-17",
                 "poster_path":"/6T51mN3bmRCwyklX20OJH8Z0GRn.jpg",
                 "popularity":0.655843437173122,
                 "title":"Troll",
                 "vote_average":4.8,
                 "vote_count":4
         }],
        "total_pages":1,
        "total_results":14
    };

    beforeEach(function () {
        module('services.tmdb');
        inject(function (_Tmdb_, _$httpBackend_, _$rootScope_) {
            Tmdb = _Tmdb_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        });
    });

    describe(".search", function () {
        beforeEach(function () {
            $httpBackend
                .whenRoute('GET', API_BASE)
                .respond(API_MOCK_RESPONSE);
        });
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should call the tmdb API with the search term", function () {
            $httpBackend.expectGET(API_QUERY_BASE + 'Test');
            Tmdb.search('Test');
            $httpBackend.flush();
        });
        it("should URL encode the search term", function () {
            $httpBackend.expectGET(API_QUERY_BASE + 'Monty+Python%23');
            Tmdb.search('Monty Python#');
            $httpBackend.flush();
        });
        it("should return an API results object", function () {
            var result;
            Tmdb.search('anything').then(function (response) {
                result = response;
            });
            $httpBackend.flush();
            $rootScope.$digest();
            //noinspection JSUnusedAssignment
            expect(result).toEqual(API_MOCK_RESPONSE);
        });
    });

});