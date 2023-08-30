import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchPageComponent } from './search.page';
import { CollectionService } from 'app/services/collection.service';
import { NavController } from '@ionic/angular';
import { NavMock } from 'app/mock/mocks';



describe('SearchPage', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['search'])

    const emptyCard = {
        id: undefined,
        name: 'no search result.',
        content: undefined,
        normalizedContent: undefined,
        cards: undefined,
        objects: undefined,
        pdf: undefined
    }
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SearchPageComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CollectionService, useValue: collectionServiceMock },
                { provider: NavController, useClass: NavMock }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('search no result', () => {
        collectionServiceMock.search.and.returnValue([]);
        component.search();
        expect(component.cardList).toEqual([emptyCard]);
    })

    it('search result', () => {
        collectionServiceMock.search.and.returnValue([{
            ...emptyCard,
            id: 'testid',
            name: 'testname'
        }]);
        component.search();
        expect(component.cardList).toEqual([{
            id: 'testid',
            name: 'testname',
            content: undefined,
            normalizedContent: undefined,
            cards: undefined,
            objects: undefined,
            pdf: undefined
        }]);
    });

    it('gotoCard ignore if no id', () => {

        const navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'navigateForward');
        component.gotoCard(emptyCard);
        expect(navCtrl.navigateForward).not.toHaveBeenCalled();

    });
    it('gotoCard ignore if no id', () => {
        const navCtrl = fixture.debugElement.injector.get(NavController);
        spyOn(navCtrl, 'navigateForward');
        component.gotoCard(
            {
                ...emptyCard,
            id: 'testid'
        });
        expect(navCtrl.navigateForward).toHaveBeenCalledWith('/card/testid', {skipLocationChange: true});

    });
});
