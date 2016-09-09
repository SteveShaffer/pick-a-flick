describe("app component", function () {
    "use strict";

    var $componentController;
    var Tmdb;

    beforeEach(function () {
        module('components.app');
        inject(function (_$componentController_, _Tmdb_) {
            $componentController = _$componentController_;
            Tmdb = _Tmdb_;
        });
    });

    it("should call the Tmdb service when a search is executed", function () {
        spyOn(Tmdb, 'search').and.returnValue({
            then: angular.noop
        });
        var ctrl = $componentController('pafApp', null, {});
        ctrl.executeSearch('test');
        expect(Tmdb.search).toHaveBeenCalledWith('test');
    });
    // TODO: Test that it sets the search results onto the scope
});