/* global expect */

'use strict';
describe('Component: menu', function () {

    beforeEach(function () {
        module('ptjMenuModule');
    });


    it("should have a menu ", inject(function (menu) {
        expect(menu).not.toBeUndefined();
    }));
    
    it("should handle sections selection ", inject(function (menu) {
        var section = { id:1};
        expect(menu.selectSection(section)).toBeUndefined();
        expect(menu.isOpen(section)).toBeTruthy();
        expect(menu.toggleSelectSection(section)).toBeUndefined();
        expect(menu.isOpen(section)).toBeFalsy();
    }));
   
    it("should handle page selection ", inject(function (menu) {
        var section = { id:2};
        var page = {};
        expect(menu.isOpen(section)).toBeFalsy();
        
        expect(menu.selectPage(section, page)).toBeUndefined();
        expect(menu.isOpen(section)).toBeFalsy();
        expect(menu.isPageSelected(page)).toBeTruthy();
        
        
    }));
    
    
});