/* global angular */

( function() {
    'use strict';

    angular
            .module( 'cards' )
            .controller( 'CardsController', CardsController );

    CardsController.$inject = [ 'cardsService', '$mdSidenav', '$mdMedia', 'menu', '$scope', '$stateParams', '$rootScope' ];

    /**
     * Main Controller for the Cards Collection App
     * @param $mdSidenav
     * @param cardService
     * @param menu
     * @param $mdMedia
     * @param $scope
     * @param $stateParams
     * @param $rootScope
     * @constructor
     */
    function CardsController( cardService, $mdSidenav, $mdMedia, menu, $scope, $stateParams, $rootScope ) {
        var self = this;

        self.breadcrum = breadcrum;
        self.cards = [];
        self.collection = null;
        self.determineMenuIcon = determineMenuIcon;

        self.menu = menu;

        self.onMenuClick = onMenuClick;
        self.openMenu = openMenu;

        self.selected = null;
        self.selectedImage = null;
        self.selectedObject = null;
        self.selectObject = selectObject;

        self.showImage = showImage;
        self.showObjectCard = showObjectCard;
        self.showObjectList = showObjectList;

        activate();

        $scope.$watch( function() {
            return $mdMedia( 'gt-md' );
        }, function( big ) {
            if ( big )
                self.selectedObject = null;
        } );

        function activate() {

// *****************************************************************
// Load all registered cards
// *****************************************************************
            return cardService
                    .loadAllCards()
                    .$promise
                    .then( function( data ) {
                        self.collection = data;
                        self.cards = [].concat( data.cards );
                        self.cards.forEach( makeContent );
                        if ( $stateParams === undefined ) {
                            self.selected = self.cards[0];
                        } else {
                            self.selected = findCardByName( $stateParams.id );
                        }
                        $rootScope.updateTitle = self.collection.name + " - " + self.selected.name;
                        self.menu = buildMenuSections( self.menu, self.cards, self.selected );

                    } );
        }
        ;

        function showObjectCard() {
            return self.selectedObject !== null;
        }
        ;

        function showObjectList() {
            return !$mdMedia( "gt-md" ) && self.selectedObject === null;
        }
        ;

        function selectObject( o ) {
            self.selectedObject = o;
        }
        ;

        function breadcrum() {
            var crums = [];
            crums.push( self.selected.name );
            if ( !$mdMedia( "gt-md" ) && self.selectedObject ) {
                crums.push( self.selectedObject.name );
            }
            return crums;
        }
        ;

        function showImage( image ) {
            self.selectedImage = image;
        }
        ;

        function determineMenuIcon() {
            if ( self.showObjectList() ) {
                return 'menu';
            }
            return 'arrow_back';
        }
        ;
        function onMenuClick() {
            if ( self.showObjectList() ) {
                self.openMenu();
            } else {
                self.selectObject( null );
            }
        }
        ;

        // *********************************
        // Internal methods
        // *********************************

        function makeContent( card ) {
            if ( angular.isArray( card.content ) ) {
                var content = "";
                card.content.forEach( function( c ) {
                    content = content + c + "\n";
                } );
                card.content = content;
            }
            if ( angular.isArray( card.htmlContent ) ) {
                var htmlContent = "";
                card.htmlContent.forEach( function( c ) {
                    htmlContent = htmlContent + c;
                } );
                card.htmlContent = htmlContent;
            }
            if ( card.cards ) {
                card.cards.forEach( makeContent );
            }
            if ( card.objects ) {
                card.objects.forEach( function( o ) {
                    if ( angular.isArray( o.content ) ) {
                        var content = "";
                        o.content.forEach( function( c ) {
                            content = content + c + "\n";
                        } );
                        o.content = content;
                    }
                    if ( angular.isArray( o.htmlContent ) ) {
                        var htmlContent = "";
                        o.htmlContent.forEach( function( c ) {
                            htmlContent = htmlContent + c;
                        } );
                        o.htmlContent = htmlContent;
                    }
                } );
            }
        }
        ;

        function openMenu() {
            $mdSidenav( 'left' ).open();
        }
        ;

        function buildMenuSections( menu, cards, current ) {
            menu.sections = [];
            cards.forEach( function( card ) {
                var section = {
                    name: card.name,
                    type: 'toggle'
                };
                menu.sections.push( section );

                if ( card.cards === undefined ) {
                    section.type = 'link';
                    section.card = card;
                    section.url = card.url;
                    section.avatar = card.avatar;
                    section.id = card.id;
                    if ( card.id === current.id ) {
                        self.menu.selectSection( section );
                        self.menu.selectPage( section, section );
                    }
                } else {
                    section.pages = [];
                    card.cards.forEach( function( c ) {
                        var page = {
                            name: c.name,
                            card: c,
                            avatar: c.avatar,
                            type: 'link',
                            id: c.id
                        };
                        section.pages.push( page );
                        if ( c.id === current.id ) {
                            self.menu.selectSection( section );
                            self.menu.selectPage( section, page );
                        }

                    } );
                }
            } );
            return menu;
        }
        ;

        function findCardByName( id ) {
            if ( id === undefined ) {
                return self.cards[0];
            }
            var card = self.cards[0];
            self.cards.forEach( function( c ) {
                if ( c.id === id ) {
                    card = c;
                }
                if ( c.cards !== undefined ) {
                    c.cards.forEach( function( sc ) {
                        if ( sc.id === id ) {
                            card = sc;
                        }
                    } );
                }
            } );
            return card;
        }
        ;
    }
} )();
