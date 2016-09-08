(function () {
    /**
     * Wrapper for the TMDB API
     */
    angular.module('services.tmdb', [])
        .service('Tmdb', TmdbService);

    function TmdbService ($http, $q) {

        var external = {
            search: search
        };

        var API_BASE = 'http://api.themoviedb.org/3/';  // TODO: Expose as constant and share with spec
        var API_KEY = '42b3e60b6636f50062f6d3579100d83f';  // TODO: Expose as config parameter in provider

        return external;

        /**
         * Calls the TMDB API with a search term
         * @param {String} searchTerm The term to search the database for
         * @returns {Promise} A promise resolving to the query's result
         */
        function search (searchTerm) {
            var url = API_BASE + 'search/movie';
            return $http.get(url, {
                params: {
                    api_key: API_KEY,
                    query: searchTerm
                }
            }).then(function (result) {
                if (result.status === 200) {
                    return result.data;
                } else {
                    return $q.reject(result);
                }
            });
        }
    }
    
})();
