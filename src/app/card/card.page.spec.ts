import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardPageComponent } from './card.page';
import { CollectionService } from 'app/services/collection.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { KeepHtmlPipe } from 'app/pipes/keep-html.pipe';

describe('CardPage', () => {
    let component: CardPageComponent;
    let fixture: ComponentFixture<CardPageComponent>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['findCardById', 'getName', 'getLogo'])
    const activatedRouteStub = { queryParams: new BehaviorSubject<Params>({}) };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CardPageComponent, KeepHtmlPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: CollectionService, useValue: collectionServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
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
});
