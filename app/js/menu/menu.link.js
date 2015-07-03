(function () {
    'use strict';

    angular.module('ptjMenuModule')
            .directive('menuLink', menuLink)
            ;
    function menuLink() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'partials/menu-link.tmpl.html',
            link: function ($scope, $element) {
                var controller = $element.parent().controller();

                $scope.isSelected = function () {
                    return controller.isSelected($scope.section);
                };

                $scope.setSelected = function () {
                    return controller.setSelected($scope.section);
                };

            }
        };
    }
    ;
})();

