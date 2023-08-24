import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchPageComponent } from './search.page';
import { CollectionService } from 'app/services/collection.service';
import { of } from 'rxjs';

describe('SearchPage', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['search'])

    beforeEach(waitForAsync(() => {
        collectionServiceMock.search.and.returnValue(of());
        TestBed.configureTestingModule({
    imports: [SearchPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: CollectionService, useValue: collectionServiceMock }
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
});
