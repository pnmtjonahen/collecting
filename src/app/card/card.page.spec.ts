import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardPageComponent } from './card.page';
import { CollectionService } from 'app/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { KeepHtmlPipe } from 'app/pipes/keep-html.pipe';
import { MenuController, NavController } from '@ionic/angular';
import { ShowdownService } from 'app/services/showdown.service';

describe('CardPage', () => {
    let component: CardPageComponent;
    let fixture: ComponentFixture<CardPageComponent>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['findCardById', 'getName', 'getLogo', 'nextCard', 'prevCard']);
    const showdownServiceMock = jasmine.createSpyObj(ShowdownService, ['makeHtml']);
    const menuCtrlMock = jasmine.createSpyObj(MenuController, ['toggle']);
    const navCtrlMock = jasmine.createSpyObj(NavController, ['navigateForward']);
    const activatedRouteStub = {
        snapshot: {
            paramMap: {
                get: (id: string) =>  {return id }
            }
        }
    };
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardPageComponent, KeepHtmlPipe],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: NavController, useValue: navCtrlMock },
                { provide: CollectionService, useValue: collectionServiceMock },
                { provide: ShowdownService, useValue: showdownServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: MenuController, useValue: menuCtrlMock}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ionViewWillEnter', () => {
        component.ionViewWillEnter();
        expect(collectionServiceMock.findCardById).toHaveBeenCalledWith('id')
    })

    it('should convert content', () => {
        showdownServiceMock.makeHtml.and.returnValue('markup');
        expect(component.convert('input')).toEqual('markup');
    });

    it('calls the next service', () => {
        component.nextCard();
        expect(collectionServiceMock.nextCard).toHaveBeenCalledWith(component.current);
    });
    it('calls the prev service', () => {
        component.prevCard();
        expect(collectionServiceMock.prevCard).toHaveBeenCalledWith(component.current);
    });

    it('navigates to search', () => {
        component.searchToggle();
        expect(navCtrlMock.navigateForward).toHaveBeenCalledWith('/search', {skipLocationChange: true});
    })

    it('toggles the menu', () => {
        component.menuToggle();
        expect(menuCtrlMock.toggle).toHaveBeenCalled();
    });
});
