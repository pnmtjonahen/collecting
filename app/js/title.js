(function () {
    'use strict';

    angular
            .module('updateTitleModule', [])
            .directive('updateTitle', ['$rootScope', '$timeout',
                function ($rootScope, $timeout) {
                    return {
                        link: function (scope, element) {

                            var listener = function (event, current, previous) {

                                var title = 'Collecting...';
                                $timeout(function () {
                                    element.text(title);
                                }, 0, false);
                            };

                            $rootScope.$on('$stateChangeSuccess', listener);
                        }
                    };
                }
            ]);

})();
