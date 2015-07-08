/* global angular */

(function () {
    'use strict';

    angular
            .module('collectingApp')
            .config(configTheming)
            .config(configRouting)
            .config(configIvoMarktdown)
            ;

    configTheming.$inject = ['$mdThemingProvider'];
    function configTheming($mdThemingProvider) {

        $mdThemingProvider.theme('default')
                .primaryPalette('brown')
                .accentPalette('red');

    }
    
    configIvoMarktdown.$inject = ['ivoMarkdownConfigProvider'];
    function configIvoMarktdown(ivoMarkdownConfigProvider) {
        ivoMarkdownConfigProvider.config({extensions: ['table', 'targetblank']});
    }

    configRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
    function configRouting($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
                .state('main', {
                    url: "/:id",
                    templateUrl: "partials/cards.html",
                    controller:"CardController",
                    controllerAs:"cl"
                });
    }
    ;

})();
