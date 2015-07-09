/* global angular */

( function() {
    "use strict";

    angular.module( "ptjMenuModule" )
            .directive( "ptjMenuToggle", ptjMenuToggle )
            ;
    function ptjMenuToggle() {
        return {
            scope: {
                section: "="
            },
            templateUrl: "partials/menu-toggle.tmpl.html",
            link: function( $scope, $element ) {
                var controller = $element.parent().controller();
                $scope.isOpen = function() {
                    return controller.menu.isOpen( $scope.section );
                };
                $scope.toggle = function() {
                    controller.menu.toggleSelectSection( $scope.section );
                };
            }
        };
    }
} )();

