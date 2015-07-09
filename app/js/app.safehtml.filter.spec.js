/* global expect */

"use strict";
describe( "Filter: safeHtmlFilter", function() {

    beforeEach( function() {
        module( "collectingApp" );
    } );

    it( "has a safeHtml filter", inject( function( $filter ) {
        expect( $filter( "safeHtml" ) ).not.toBeNull();
    } ) );

    it( "should return true empty array ", inject( function( safeHtmlFilter ) {
        expect( safeHtmlFilter( "true" ) ).toBeTruthy();
    } ) );

} );
