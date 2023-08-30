import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { Card, Collection, CollectionService } from './services/collection.service';
import { BehaviorSubject, Subject, } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

describe('AppComponent', () => {
    let navCtrlMock;
    let collectionServiceMock;

    let nextCardSubject;
    let prevCardSubject;
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(waitForAsync(() => {
        navCtrlMock = jasmine.createSpyObj(NavController, ['navigateForward', 'navigateRoot']);
        collectionServiceMock = jasmine.createSpyObj(CollectionService, ['onNextCard', 'findNextCardById', 'onPrevCard', 'findPrevCardById', 'load']);


        nextCardSubject = new Subject();
        prevCardSubject = new Subject();
        collectionServiceMock.onNextCard.and.returnValue(nextCardSubject);
        collectionServiceMock.onPrevCard.and.returnValue(prevCardSubject);
        collectionServiceMock.load.and.returnValue(Promise.resolve({ cards: [{ id: 'card1' }] } as Collection));

        const activatedRouteStub = { queryParams: new BehaviorSubject<Params>({}) };

        TestBed.configureTestingModule({
            imports: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CollectionService, useValue: collectionServiceMock },
                { provide: NavController, useValue: navCtrlMock },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should open the first card', (done) => {
        fixture.whenStable().then(() => {
            expect(navCtrlMock.navigateRoot).toHaveBeenCalledWith('/card/card1', { skipLocationChange: true });
            done();
        });
    });

    it('should trigger next card', () => {
        collectionServiceMock.findNextCardById.and.returnValue({ id: 'test' });

        nextCardSubject.next({ id: 'old' } as Card);
        expect(navCtrlMock.navigateRoot).toHaveBeenCalledWith('/card/test', { skipLocationChange: true });
    });
    it('should trigger prev card', () => {
        collectionServiceMock.findPrevCardById.and.returnValue({ id: 'test' });

        prevCardSubject.next({ id: 'old' } as Card);
        expect(navCtrlMock.navigateRoot).toHaveBeenCalledWith('/card/test', { skipLocationChange: true });
    });

    it('onOpenCard', () => {

        component.onOpenCard(
            {
                detail: {
                    id: 'testid'
                }
            } as CustomEvent
        );
        expect(navCtrlMock.navigateForward).toHaveBeenCalledWith('/card/testid', { skipLocationChange: true });

    });

    describe('openPage', () => {
        it('opens a card', () => {
            component.openPage({ id: 'test' } as Card);
            expect(navCtrlMock.navigateRoot).toHaveBeenCalledWith('/card/test', { skipLocationChange: true });
        });
        it('opens a card menu', () => {
            component.openPage({ id: 'test', cards: [] } as Card);
            expect(navCtrlMock.navigateRoot).not.toHaveBeenCalled();
        });
    });

    describe('toggel level', () => {
        it('clears the level', () => {
            component.showLevel1 = 'test';
            component.toggleLevel('test');
            expect(component.showLevel1).toBeNull();
        });
        it('replace the level', () => {
            component.showLevel1 = 'test1';
            component.toggleLevel('test');
            expect(component.showLevel1).toEqual('test');
        });
        it('set the level', () => {
            component.showLevel1 = undefined;
            component.toggleLevel('test');
            expect(component.showLevel1).toEqual('test');
        });
    });

    describe('show level', () => {
        it('level is shown', () => {
            component.showLevel1 = 'test';
            expect(component.isLevelShown('test')).toBeTrue();
        })
        it('level is not shown', () => {
            component.showLevel1 = 'not';
            expect(component.isLevelShown('test')).toBeFalse();
        })
    });


    describe('hasSubLevel', () => {
        it('has no sublevel cards', () => {
            expect(component.hasSubLevel({} as Card)).toBeFalse();
        });
        it('has sublevel cards', () => {
            expect(component.hasSubLevel({ cards: [{} as Card] } as Card)).toBeTrue();
        });
    });
});
