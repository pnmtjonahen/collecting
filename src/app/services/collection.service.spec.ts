import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    }));

    it('should be created', () => {
        const service: CollectionService = TestBed.inject(CollectionService);
        expect(service).toBeTruthy();
    });
});
