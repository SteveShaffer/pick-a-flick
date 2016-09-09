(function () {
    /**
     * A filter that just passes dates through moment.js' format function
     * @example
     * {{ '2016-09-09' | moment:'M/YYYY' }}
     */
    angular
        .module('filters.moment', [])
        .filter('moment', momentFilter);

    function momentFilter () {  // TODO: Test this filter
        return function (input, format) {
            return moment(input).format(format);
        }
    }
})();
