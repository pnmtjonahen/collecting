/* global angular */

( function() {
    'use strict';

    angular
            .module( 'collectingApp' )
            .filter( 'safeHtml', safeHtmlFilter )
            ;

    safeHtmlFilter.$inject = [ '$sce' ];
    function safeHtmlFilter( $sce ) {
        return function( text ) {
            return $sce.trustAsHtml( text );
        };

    }
    ;

} )();

