(function () {
    /**
     * The main module of the app
     */
    angular
        .module('components.app', [
            'components.searchBox',
            'components.movieList',
            'services.tmdb'
        ])
        .component('pafApp', {
            templateUrl: 'components/app/app.tpl.html',
            controller: AppController
        });

    function AppController (Tmdb) {
        var vm = this;

        vm.executeSearch = function (value) {
            vm.searchTerm = value;
            Tmdb.search(value).then(function (result) {
                vm.searchResults = result.results;
            });
        }
    }
})();
