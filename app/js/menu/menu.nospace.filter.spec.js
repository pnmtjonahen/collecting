/* global expect */

"use strict";
describe( "Filter: menu.nospaceFilter", function() {

    beforeEach( function() {
        module( "ptjMenuModule" );
    } );

    it( "has a nospace filter", inject( function( $filter ) {
        expect( $filter( "nospace" ) ).not.toBeNull();
    } ) );

    it( "should return sometext ", inject( function( nospaceFilter ) {
        expect( nospaceFilter( "some text" ) ).toBe( "sometext" );
    } ) );

    it( "should return sometext ", inject( function( nospaceFilter ) {
        expect( nospaceFilter( " some  text " ) ).toBe( "sometext" );
    } ) );

    it( "should return nothing ", inject( function( nospaceFilter ) {
        expect( nospaceFilter() ).toBe( "" );
    } ) );

} );
