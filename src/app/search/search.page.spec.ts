import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchPage } from './search.page';
import { CollectionService } from 'app/services/collection.service';
import { of } from 'rxjs';

describe('SearchPage', () => {
    let component: SearchPage;
    let fixture: ComponentFixture<SearchPage>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['search'])

    beforeEach(waitForAsync(() => {
        collectionServiceMock.search.and.returnValue(of());
        TestBed.configureTestingModule({
            declarations: [SearchPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: CollectionService, useValue: collectionServiceMock }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
