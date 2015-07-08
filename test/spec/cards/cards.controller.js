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
    var dummy2 = {
        "id": "dummy2",
        "name": "dummy2",
        "cards": [
            {
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
            }
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
                createController;

        beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'data/cards.json').respond(cards_json);
            createController = function () {
                $httpBackend.expectGET('data/cards.json');
                cardsCtrl = $controller('CardController', {$scope: $rootScope.$new()});
                $httpBackend.flush();
            };
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have a card with data', function () {
            createController();

            expect(cardsCtrl.cards.length).toBe(2);
            expect(cardsCtrl.collection).not.toBeUndefined();

            expect(cardsCtrl.determineMenuIcon()).toBe("menu");
        });

    });
})();