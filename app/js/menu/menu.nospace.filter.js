/* global angular */

( function() {
    "use strict";

    angular.module( "ptjMenuModule" )
            .filter( "nospace", nospace )
            ;

    function nospace() {
        return function( value ) {
            return ( !value ) ? "" : value.replace( / /g, "" );
        };
    }
    ;
} )();

