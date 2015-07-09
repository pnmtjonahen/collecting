/* global angular */

(function () {
    'use strict';

    angular.module('cards')
            .factory('cardsService', CardsService);

    CardsService.$inject = ['$resource'];        
    /**
     * Cards DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @param $resource -
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function CardsService($resource) {
        return $resource('data/cards.json', {}, {
            loadAllCards: {method: 'GET', params: {}, isArray: false}
        });
    }
    ;

})();
