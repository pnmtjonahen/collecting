import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardPage } from './card.page';
import { CollectionService } from 'app/services/collection.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { KeepHtmlPipe } from 'app/pipes/keep-html.pipe';

describe('CardPage', () => {
    let component: CardPage;
    let fixture: ComponentFixture<CardPage>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['findCardById', 'getName', 'getLogo'])
    const activatedRouteStub = { queryParams: new BehaviorSubject<any>({}) };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardPage, KeepHtmlPipe],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CollectionService, useValue: collectionServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
