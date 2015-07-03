(function () {
    'use strict';

    angular.module('ptjMenuModule')
            .directive('menuToggle', menuToggle)
            ;
    function menuToggle() {
        return {
            scope: {
                section: '='
            },
            templateUrl: 'partials/menu-toggle.tmpl.html',
            link: function ($scope, $element) {
                var controller = $element.parent().controller();
                $scope.isOpen = function () {
                    return controller.isOpen($scope.section);
                };
                $scope.toggle = function () {
                    controller.toggleOpen($scope.section);
                };

                var parentNode = $element[0].parentNode.parentNode.parentNode;
                if (parentNode.classList.contains('ptj-parent-list-item')) {
                    var heading = parentNode.querySelector('h2');
                    $element[0].firstChild.setAttribute('aria-describedby', heading.id);
                }
            }
        };
    }
})();

