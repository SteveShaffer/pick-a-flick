(function () {
    angular
        .module('components.movieList', [
            'components.movieCard'
        ])
        .component('pafMovieList', {
            templateUrl: 'components/movieList/movieList.tpl.html',
            bindings: {
                movies: '<'
            }
        });
})();
