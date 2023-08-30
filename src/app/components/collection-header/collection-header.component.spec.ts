
import { CollectionHeaderComponent } from './collection-header.component';
import { CollectionService } from 'app/services/collection.service';

describe('CollectionHeaderComponent', () => {
    let component: CollectionHeaderComponent;
    const collectionServiceMock = jasmine.createSpyObj(CollectionService, ['getName', 'getLogo'])

    beforeEach(() => {
        collectionServiceMock.getName.and.returnValue('name');
        collectionServiceMock.getLogo.and.returnValue('logo');
        component = new CollectionHeaderComponent(collectionServiceMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain the logo', () => {
        expect(component.logo).toEqual('logo');
    })
    it('should contain the name', () => {
        expect(component.name).toEqual('name');
    })
});
