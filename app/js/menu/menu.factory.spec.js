/* global expect */

"use strict";
describe( "Component: menu", function() {
    var section1 = { id: 1 };

    beforeEach( function() {
        module( "ptjMenuModule" );
    } );

    it( "should have a menu ", inject( function( menu ) {
        expect( menu ).not.toBeUndefined();
    } ) );

    it( "should handle sections selection ", inject( function( menu ) {
        expect( menu.selectSection( section1 ) ).toBeUndefined();
        expect( menu.isOpen( section1 ) ).toBeTruthy();
        expect( menu.isSectionSelected( section1 ) ).toBeTruthy();

        expect( menu.toggleSelectSection( section1 ) ).toBeUndefined();

        expect( menu.isOpen( section1 ) ).toBeFalsy();
        expect( menu.isSectionSelected( section1 ) ).toBeFalsy();
    } ) );
    it( "should handle sub sections selection (child selection of a section) ",
                                                                inject( function( menu ) {
        var child = { id:1 };
        var section = { id: 2, children:[ { id:3 }, child ] };
        expect( menu.selectSection( child ) ).toBeUndefined();
        expect( menu.isOpen( child ) ).toBeTruthy();
        expect( menu.isSectionSelected( section ) ).toBeTruthy();

    } ) );

    it( "should handle page selection ", inject( function( menu ) {
        var section = { id: 2 };
        var page = {};
        expect( menu.isOpen( section ) ).toBeFalsy();

        expect( menu.selectPage( section, page ) ).toBeUndefined();
        expect( menu.isOpen( section ) ).toBeFalsy();
        expect( menu.isPageSelected( page ) ).toBeTruthy();
    } ) );

} );
