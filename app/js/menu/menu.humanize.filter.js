/* global angular */

( function() {
    'use strict';

    angular.module( 'ptjMenuModule' )
            .filter( 'humanize', humanize )
            ;

    function humanize() {
        return function( doc ) {
            if ( !doc )
                return;
            if ( doc.type === 'directive' ) {
                return doc.name.replace( /([A-Z])/g, function( $1 ) {
                    return '-' + $1.toLowerCase();
                } );
            }
            return doc.name;
        };
    }
    ;
} )();

