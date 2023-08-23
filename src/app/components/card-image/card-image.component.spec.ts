import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardImageComponent } from './card-image.component';

describe('CardImageComponent', () => {
    let component: CardImageComponent;
    let fixture: ComponentFixture<CardImageComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CardImageComponent],
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

    describe('determine name', () => {
        it('name is undefined', () => {
            expect(component.determineName(undefined)).toBe(undefined);
        });
        it('image is the name', () => {
            expect(component.determineName('name')).toBe('name');
        });
        it('image is object with name', () => {
            expect(component.determineName({ name: 'name' })).toBe('name');
        });
    });
});
