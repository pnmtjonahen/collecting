/* global expect */

(function () {
    'use strict';

    var dummy1 = {
        "id": "dummy1",
        "name": "dummy1",
        "content": [
            "###Dummy",
            "Dummy content"
        ],
        "htmlContent": [
            "<html></html>"
        ],
        "objects": [
            {
                "images": [],
                "name": "dummbyobj",
                "content": "content",
                "htmlContent": "content"
            },
            {
                "images": [],
                "name": "dummbyobj2",
                "content": ["content"],
                "htmlContent": ["content"]
            }
        ]
    };
    var dummy3 = {
        "id": "dummy3",
        "name": "dummy3",
        "content": [
            "###Dummy",
            "Dummy content"
        ],
        "htmlContent": [
            "<html></html>"
        ],
        "objects": [
            {
                "images": [],
                "name": "dummbyobj",
                "content": "content",
                "htmlContent": "content"
            },
            {
                "images": [],
                "name": "dummbyobj2",
                "content": ["content"],
                "htmlContent": ["content"]
            }
        ]
    };
    var dummy2 = {
        "id": "dummy2",
        "name": "dummy2",
        "cards": [
            dummy3
        ]
    };

    var cards_json = {
        "name": "dummy",
        "logo": "dummy",
        "cards": [dummy1, dummy2]
    };

    describe('Controller: CardsController', function () {

        // load the controller's module
        beforeEach(module('collectingApp'));

        var cardsCtrl,
                $httpBackend,
                createController,
                createLinkToController;

        beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'data/cards.json').respond(cards_json);
            createController = function () {
                $httpBackend.expectGET('data/cards.json');
                cardsCtrl = $controller('CardController', {$scope: $rootScope.$new(), $stateParams:undefined});
                $httpBackend.flush();
            };
            createLinkToController = function () {
                $httpBackend.expectGET('data/cards.json');
                cardsCtrl = $controller('CardController', {$scope: $rootScope.$new(), $stateParams: {id: 'dummy3'}});
                $httpBackend.flush();
            };
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have a cards', function () {
            createController();

            expect(cardsCtrl.cards.length).toBe(2);
            expect(cardsCtrl.collection).not.toBeUndefined();

        });
        it('should have a menu icon of menu', function () {
            createController();
            expect(cardsCtrl.determineMenuIcon()).toBe("menu");

        });
        it('should have a second card selected', function () {
            createLinkToController();
            expect(cardsCtrl.selected.id).toBe(dummy3.id);
        });
        it('should have a first card selected', function () {
            createController();
            expect(cardsCtrl.selected.id).toBe(dummy1.id);
        });

        it('should have a no object to show', function () {
            createController();

            expect(cardsCtrl.showObjectCard()).toBeFalsy();
        });
        it('should have a objectList to show', function () {
            createController();

            expect(cardsCtrl.showObjectList()).toBeTruthy();
        });
        it('should have a breadcrum', function () {
            createController();
            expect(cardsCtrl.breadcrum().length).toBe(1);
        });

    });
})();