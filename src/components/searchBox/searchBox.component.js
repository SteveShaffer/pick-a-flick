(function () {
    /**
     * A real-time search input box
     */
    angular
        .module('components.searchBox', [])
        .component('pafSearchBox', {
            templateUrl: 'components/searchBox/searchBox.tpl.html',
            bindings: {
                onUpdate: '&',
                searchTerm: '<'
            },
            controller: SearchBoxController
        });
    
    function SearchBoxController ($log) {
        var $ctrl = this;
        
        $ctrl.searchChanged = function () {
            $ctrl.onUpdate({value: $ctrl.searchTerm});
        };

        $ctrl.$onChanges = function (changes) {
            $log.log(changes);
        }
    }
})();
