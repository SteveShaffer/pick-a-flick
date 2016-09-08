describe("searchBox component", function () {
    "use strict";

    var $componentController;

    beforeEach(function () {
        module('components.searchBox');
        inject(function (_$componentController_) {
            $componentController = _$componentController_;
        });
    });
    
    it("should expose a searchTerm binding", function () {
        var searchTerm = 'testing';
        var ctrl = $componentController('pafSearchBox', null, {
            searchTerm: searchTerm
        });
        expect(ctrl.searchTerm).toBe(searchTerm);
    });
    it("should call the onUpdate binding when the search term is changed", function () {
        var bindings = {
            onUpdate: jasmine.createSpy('onUpdate'),
            searchTerm: 'testing 123'
        };
        var ctrl = $componentController('pafSearchBox', null, bindings);
        ctrl.searchChanged();
        expect(bindings.onUpdate).toHaveBeenCalledWith({value: bindings.searchTerm});
    });
});