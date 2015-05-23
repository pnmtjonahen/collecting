(function () {
    'use strict';

    angular
            .module('collectingApp', ['ngMaterial', 'angular-flexslider', 'ivoMarkdown', 'ptjMenuModule', 'cards'])
            .config(function ($mdThemingProvider) {

                $mdThemingProvider.theme('default')
                        .primaryPalette('brown')
                        .accentPalette('red');

            })
            .config(['ivoMarkdownConfigProvider', function (ivoMarkdownConfigProvider) {
                    ivoMarkdownConfigProvider.config({extensions: ['table']});
                }])
            .filter('safeHtml', ['$sce', function ($sce) {
                    return function (text) {
                        return $sce.trustAsHtml(text);
                    };
                }])
            ;
})();
