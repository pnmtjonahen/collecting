/* global angular, expect */

'use strict';

describe('Directive: menu.toggle', function () {
    beforeEach(module('ptjMenuModule'));

    var element;
    var card = {
        url: 'dummy',
        avatar: 'dummy',
        id: 1
    };
    var section = {
        type: 'link',
        card: card,
        url: card.url,
        avatar: card.avatar,
        id: card.id
    };


    beforeEach(module('partials/menu-link.tmpl.html'));
    beforeEach(module('partials/menu-toggle.tmpl.html'));
    beforeEach(module('ptjMenuModule', function ($controllerProvider) {
        $controllerProvider.register('Controller', function (menu) {
            var self = this;
            self.menu = menu;
            self.menu.selectSection(section);
            self.menu.selectPage(section, section);


        });
    }));

    beforeEach(inject(function ($rootScope, $compile) {

        element = angular.element('<div ng-controller="Controller"><menu-toggle section="section"></menu-link></div>');

        var scope = $rootScope;

        scope.section = section;

        $compile(element)(scope);
        scope.$digest();
    }));

    it("should have a button", function () {
        var list = element.find('md-button');
        expect(list.length).toBe(1);
    });

});