(function () {
    /**
     * The main module of the app
     */
    angular
        .module('components.app', [
            'components.searchBox',
            'services.tmdb'
        ])
        .component('pafApp', {
            templateUrl: 'components/app/app.tpl.html',
            controller: AppController
        });

    function AppController (Tmdb) {  // TODO: Test this controller
        var vm = this;

        vm.executeSearch = function (value) {
            Tmdb.search(value).then(function (results) {
                vm.searchResults = results;
            });
        }
    }
})();
