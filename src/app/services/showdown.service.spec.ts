import { TestBed } from '@angular/core/testing';

import { ShowdownService } from './showdown.service';

describe('ShowdownService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ShowdownService = TestBed.inject(ShowdownService);
        expect(service).toBeTruthy();
    });
});
