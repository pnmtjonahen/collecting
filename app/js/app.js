(function () {
    'use strict';

    angular
            .module('collectingApp', ['ngMaterial', 'ngMdIcons', 'angular-flexslider', 'ivoMarkdown', 'ptjMenuModule', 'cards'])
            .config(configTheming)
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
})();
