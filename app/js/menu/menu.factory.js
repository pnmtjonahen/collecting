/* global angular */

( function() {
    "use strict";

    angular.module( "ptjMenuModule" )
            .factory( "menu", menu );

    function menu() {

        var self = {
            sections: [],
            selectSection: selectSection,
            toggleSelectSection: toggleSelectSection,
            isOpen: isOpen,
            selectPage: selectPage,
            isPageSelected: isPageSelected,
            isSectionSelected: isSectionSelected
        };

        return self;

        function selectSection( section ) {
            self.openedSection = section;
        }
        ;

        function toggleSelectSection( section ) {
            self.openedSection = ( self.openedSection === section ? null : section );
        }
        ;

        function isOpen( section ) {
            return self.openedSection === section;
        }
        ;

        function selectPage( section, page ) {
            self.currentSection = section;
            self.currentPage = page;
        }
        ;
        function isPageSelected( page ) {
            return self.currentPage === page;
        }
        ;

        function isSectionSelected( section ) {
            var selected = false;
            if ( self.openedSection === section ) {
                selected = true;
            } else if ( section.children ) {
                section.children.forEach( function( childSection ) {
                    if ( childSection === self.openedSection ) {
                        selected = true;
                    }
                } );
            }
            return selected;
        }
        ;
    }
    ;
} )();

