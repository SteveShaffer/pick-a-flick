(function () {
    angular
        .module('components.movieCard', [
            'filters.moment'
        ])
        .component('pafMovieCard', {
            templateUrl: 'components/movieCard/movieCard.tpl.html',
            bindings: {
                movie: '<'
            }
        });
})();
