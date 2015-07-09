/* global expect */

'use strict';
describe( 'Filter: menu.humanizeFilter', function() {

    beforeEach( function() {
        module( 'ptjMenuModule' );
    } );

    it( 'has a humanize filter', inject( function( $filter ) {
        expect( $filter( 'humanize' ) ).not.toBeNull();
    } ) );

    it( "should return nothing ", inject( function( humanizeFilter ) {
        expect( humanizeFilter( "some text" ) ).toBeUndefined();
    } ) );
    
    it( "should return nothing ", inject( function( humanizeFilter ) {
        expect( humanizeFilter() ).toBeUndefined();
    } ) );
    
    it( "should return some doc text ", inject( function( humanizeFilter ) {
        var doc = {
          name:'some doc text',
          type:'directive'
        };
        expect( humanizeFilter( doc ) ).toBe( "some doc text" );
    } ) );
    it( "should return some doc text ", inject( function( humanizeFilter ) {
        var doc = {
          name:'someDocText',
          type:'directive'
        };
        expect( humanizeFilter( doc ) ).toBe( "some-doc-text" );
    } ) );

} );
