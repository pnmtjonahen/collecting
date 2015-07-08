/* global expect */

'use strict';
describe('Filter: menu.humanizeFilter', function () {

    beforeEach(function () {
        module('ptjMenuModule');
    });

    it('has a humanize filter', inject(function ($filter) {
        expect($filter('humanize')).not.toBeNull();
    }));

    it("should return some text ", inject(function (humanizeFilter) {
        expect(humanizeFilter("some text")).toBe("some text");
    }));
    
    it("should return nothing ", inject(function (humanizeFilter) {
        expect(humanizeFilter()).toBeTruthy();
    }));
    
    it("should return some text ", inject(function (humanizeFilter) {
        var doc = {
          name:'some doc text',
          type:'directive'
        };
        expect(humanizeFilter(doc)).toBe("some text");
    }));

});