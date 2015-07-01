(function () {
    'use strict';

    angular
            .module('collectingApp', ['ngMaterial', 'ngMdIcons', 'angular-flexslider', 'ui.router', 'ivoMarkdown', 'ptjMenuModule', 'cards'])
            .config(configTheming)
            .config(configRouting)
            .config(['ivoMarkdownConfigProvider', configIvoMarktdown])
            .filter('safeHtml', ['$sce', safeHtmlFilter])
            ;

    function configTheming($mdThemingProvider) {

        $mdThemingProvider.theme('default')
                .primaryPalette('brown')
                .accentPalette('red');

    }

    function configIvoMarktdown(ivoMarkdownConfigProvider) {
        ivoMarkdownConfigProvider.config({extensions: ['table', 'targetblank']});
    }

    function safeHtmlFilter($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };

    }
    ;

    function configRouting($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
                .state('main', {
                    url: "/:id",
                    templateUrl: "cards.html",
                    controller:"CardController",
                    controllerAs:"cl"
                });
    }
    ;

})();
