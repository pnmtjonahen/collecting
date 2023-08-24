import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CollectionHeaderComponent } from './collection-header.component';
import { CollectionService } from 'app/services/collection.service';

describe('CollectionHeaderComponent', () => {
    let component: CollectionHeaderComponent;
    let fixture: ComponentFixture<CollectionHeaderComponent>;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['getName', 'getLogo'])
    beforeEach(waitForAsync(() => {
        collectionServiceMock.getName.and.returnValue('name');
        collectionServiceMock.getLogo.and.returnValue('logo');
        TestBed.configureTestingModule({
    imports: [CollectionHeaderComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: CollectionService, useValue: collectionServiceMock }
    ],
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollectionHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
