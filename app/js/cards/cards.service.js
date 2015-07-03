(function () {
    'use strict';

    angular.module('cards')
            .factory('cardService', CardService);

    CardService.$inject = ['$resource'];        
    /**
     * Cards DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function CardService($resource) {
        return $resource('data/cards.json', {}, {
            loadAllCards: {method: 'GET', params: {}, isArray: false}
        });
    }
    ;

})();
