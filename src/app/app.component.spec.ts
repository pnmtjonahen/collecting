/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { NavController, Platform } from '@ionic/angular';

import { AppComponent } from './app.component';
import { CollectionService } from './services/collection.service';
import { Subject, } from 'rxjs';

export class NavMock {
    public navigateBack: (url: string | any[], options: any) => { };
    public navigateForward: (url: string | any[], options: any) => { };
    public navigateRoot: (url: string | any[], options: any) => { };
}

describe('AppComponent', () => {

    let platformReadySpy, platformSpy;

    beforeEach(waitForAsync(() => {
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
        const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['onNextCard', 'findNextCardById', 'onPrevCard', 'findPrevCardById', 'load'])
        collectionServiceMock.onNextCard.and.returnValue(new Subject());
        collectionServiceMock.onPrevCard.and.returnValue(new Subject());

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CollectionService, useValue: collectionServiceMock },
                { provide: Platform, useValue: platformSpy },
                { provide: NavController, useClass: NavMock }
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
    });

    // TODO: add more tests!

});
