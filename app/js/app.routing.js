( function() {
    "use strict";

    angular
            .module( "collectingApp" )
            .config( configRouting )
            ;

    configRouting.$inject = [ "$stateProvider", "$urlRouterProvider" ];
    function configRouting( $stateProvider, $urlRouterProvider ) {

        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise( "/" );

        //
        // Now set up the states
        $stateProvider
                .state( "main", {
                    url: "/:id",
                    templateUrl: "partials/cards.html",
                    controller:"CardsController",
                    controllerAs:"cl"
                } );
    }
    

} )();
