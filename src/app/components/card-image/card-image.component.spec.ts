import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardImageComponent } from './card-image.component';

describe('CardImageComponent', () => {
    let component: CardImageComponent;
    let fixture: ComponentFixture<CardImageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CardImageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
