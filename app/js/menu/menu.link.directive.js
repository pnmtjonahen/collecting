( function() {
    "use strict";

    angular.module( "ptjMenuModule" )
            .directive( "ptjMenuLink", ptjMenuLink )
            ;
    function ptjMenuLink() {
        return {
            scope: {
                section: "="
            },
            templateUrl: "partials/menu-link.tmpl.html",
            link: function( $scope, $element ) {
                var controller = $element.parent().controller();

                $scope.isSelected = function() {
                    return controller.menu.isPageSelected( $scope.section );
                };
            }
        };
    }
    ;
} )();

