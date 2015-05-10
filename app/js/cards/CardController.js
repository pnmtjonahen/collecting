(function () {

    angular
            .module('cards')
            .controller('CardController', [
                'cardService', '$mdSidenav', '$timeout', 'menu',
                CardController
            ]);
    /**
     * Main Controller for the Cards Collection App
     * @param $mdSidenav
     * @param cardService
     * @param $timeout
     * @param menu
     * @constructor
     */
    function CardController(cardService, $mdSidenav, $timeout, menu) {
        var self = this;

        self.selected = null;
        self.cards = [];
        self.collection = null;
        self.selectCard = selectCard;
        self.openMenu = openMenu;
        self.menu = menu;

// *****************************************************************
// Load all registered cards
// *****************************************************************
        cardService
                .loadAllCards()
                .$promise
                .then(function (data) {
                    self.collection = data;
                    self.cards = [].concat(data.cards);
                    self.cards.forEach(makeContent);
                    self.selected = self.cards[0];
                    buildMenu(self.cards);
                });


// *****************************************************************
// Menu functions. These are called from the menu directive.
// This enables the directive to call methods defined on the current menu instance.   
// *****************************************************************

        self.isSelected = function (page) {
            return menu.isPageSelected(page);
        };
        self.setSelected = function (page) {
            closeMenu();
            return selectCard(page.card);
        };

        self.isOpen = function (section) {
            return menu.isOpen(section);
        };

        self.toggleOpen = function (section) {
            menu.toggleSelectSection(section);
        };

        self.isSectionSelected = function (section) {
            var selected = false;
            var openedSection = menu.openedSection;
            if (openedSection === section) {
                selected = true;
            }
            else if (section.children) {
                section.children.forEach(function (childSection) {
                    if (childSection === openedSection) {
                        selected = true;
                    }
                });
            }
            return selected;
        };
        function matchPage(section, page) {
            if (self.selected === page.card) {
                self.menu.selectSection(section);
                self.menu.selectPage(section, page);
            }
        }
        ;

        function onSelectionChange() {

            self.menu.sections.forEach(function (section) {
                if (section.children) {
                    // matches nested section toggles, such as API or Customization
                    section.children.forEach(function (childSection) {
                        if (childSection.pages) {
                            childSection.pages.forEach(function (page) {
                                matchPage(childSection, page);
                            });
                        }
                    });
                }
                else if (section.pages) {
                    // matches top-level section toggles, such as Demos
                    section.pages.forEach(function (page) {
                        matchPage(section, page);
                    });
                }
                else if (section.type === 'link') {
                    // matches top-level links, such as "Getting Started"
                    matchPage(section, section);
                }
            });
        }
        ;
        // *********************************
        // Internal methods
        // *********************************

        function makeContent(card) {
            if (angular.isArray(card.content)) {
                var content = "";
                card.content.forEach(function (c) {
                    content = content + c + "\n";
                });
                card.content = content;
            }
            if (card.cards) {
                card.cards.forEach(makeContent);
            }
            if (card.objects) {
                card.objects.forEach(function (o) {
                   if (angular.isArray(o.content)) {
                       var content = "";
                       o.content.forEach(function(c) {
                          content = content + c + "\n"; 
                       });
                       o.content = content;
                   } 
                });
            }
        }
        ;

        function openMenu() {
            $timeout(function () {
                $mdSidenav('left').open();
            });
        }
        ;

        function closeMenu() {
            $timeout(function () {
                $mdSidenav('left').close();
            });
        }
        ;

        function buildMenu(cards) {

            cards.forEach(function (section) {
                var menuItem = {
                    name: section.name,
                    type: 'toggle'
                };

                if (section.content !== undefined) {
                    menuItem.type = 'link';
                    menuItem.card = section;
                }
                self.menu.sections.push(menuItem);
                if (section.cards !== undefined) {
                    menuItem.pages = [];
                    section.cards.forEach(function (c) {

                        menuItem.pages.push({
                            name: c.name,
                            url: '',
                            card: c,
                            avatar: c.avatar,
                            type: 'link'
                        });

                    });
                }
            });
        }
        ;

        function selectCard(card) {
            self.selected = angular.isNumber(card) ? self.cards[card] : card;
            onSelectionChange();
        }
        ;
    }
})();
