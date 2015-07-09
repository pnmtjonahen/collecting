/* global expect */

( function() {
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
                "content": [ "content" ],
                "htmlContent": [ "content" ]
            }
        ]
    };
    var object1 = {
        "images": [],
        "name": "dummbyobj",
        "content": "content",
        "htmlContent": "content"
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
            object1,
            {
                "images": [],
                "name": "dummbyobj2",
                "content": [ "content" ],
                "htmlContent": [ "content" ]
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
        "cards": [ dummy1, dummy2 ]
    };

    describe( 'Controller: CardsController', function() {

        // load the controller's module
        beforeEach( module( 'collectingApp' ) );

        var cardsCtrl,
                $httpBackend,
                createController,
                createLinkToController,
                mdMediaSize;

        beforeEach( inject( function( _$httpBackend_, $controller, $rootScope ) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when( 'GET', 'data/cards.json' ).respond( cards_json );
            createController = function() {
                $httpBackend.expectGET( 'data/cards.json' );
                cardsCtrl = $controller( 'CardsController', { $scope: $rootScope.$new(), $stateParams: undefined, $mdMedia: mdMediaMock } );
                $httpBackend.flush();
            };
            createLinkToController = function( id ) {
                $httpBackend.expectGET( 'data/cards.json' );
                cardsCtrl = $controller( 'CardsController', { $scope: $rootScope.$new(), $stateParams: { id: id }, $mdMedia: mdMediaMock } );
                $httpBackend.flush();
            };
            mdMediaSize  = "large";
        } ) );

        var mdMediaMock = function( media ) {
            return mdMediaSize === media;
        }
        afterEach( function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        } );

        it( 'should have a cards', function() {
            createController();

            expect( cardsCtrl.cards.length ).toBe( 2 );
            expect( cardsCtrl.collection ).not.toBeUndefined();

        } );
        it( 'should have a correct menu icon', function() {
            createController();
            expect( cardsCtrl.determineMenuIcon() ).toBe( "menu" );
            mdMediaSize = "gt-md";
            expect( cardsCtrl.determineMenuIcon() ).toBe( "arrow_back" );

        } );
        it( 'should have a correct card pre selected', function() {
            createLinkToController( "dummy3" );
            expect( cardsCtrl.selected.id ).toBe( dummy3.id );
            createLinkToController( undefined );
            expect( cardsCtrl.selected.id ).toBe( dummy1.id );
            createLinkToController( "dummy2" );
            expect( cardsCtrl.selected.id ).toBe( dummy2.id );

        } );
        it( 'should have a first card selected', function() {
            createController();
            expect( cardsCtrl.selected.id ).toBe( dummy1.id );
        } );

        it( 'should have a no object to show', function() {
            createController();

            expect( cardsCtrl.showObjectCard() ).toBeFalsy();
        } );
        it( 'should have a objectList to show', function() {
            createController();
            expect( cardsCtrl.showObjectList() ).toBeTruthy();
            mdMediaSize = "gt-md";
            expect( cardsCtrl.showObjectList() ).toBeFalsy();

        } );
        it( 'should have a breadcrum', function() {
            createController();
            expect( cardsCtrl.breadcrum().length ).toBe( 1 );
            cardsCtrl.selectObject( object1 );
            mdMediaSize = "md";
            expect( cardsCtrl.breadcrum().length ).toBe( 2 );
            
        } );
        it( 'should have a selected object', function() {
            createController();
            expect( cardsCtrl.selectObject( object1 ) ).toBeUndefined();
            expect( cardsCtrl.showObjectCard() ).toBeTruthy();
        } );
        it( 'should have a handle for openMenu', function() {
            createController();
            expect( cardsCtrl.openMenu() ).toBeUndefined();
        } );
        it( 'should have a handle for onMenuClick', function() {
            createController();
            expect( cardsCtrl.onMenuClick() ).toBeUndefined();
            mdMediaSize = "gt-md";
            cardsCtrl.selectObject( object1 );

            expect( cardsCtrl.showObjectCard() ).toBeTruthy();
            expect( cardsCtrl.onMenuClick() ).toBeUndefined();
            expect( cardsCtrl.showObjectCard() ).toBeFalsy();
        } );
        it( 'should have a selectImage', function() {
            createController();
            expect( cardsCtrl.selectedImage ).toBe( null );
            expect( cardsCtrl.showImage( object1 ) ).toBeUndefined();
            expect( cardsCtrl.selectedImage ).not.toBeUndefined();
        } );

    } );
} )();
