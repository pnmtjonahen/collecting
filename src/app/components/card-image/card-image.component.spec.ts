import { CardImageComponent } from './card-image.component';
import { Card, CardObject } from 'app/services/collection.service';

describe('CardImageComponent', () => {
    let component: CardImageComponent;
    beforeEach(() => {
        component = new CardImageComponent();
    });

    describe('should set the correct image source and alt for a Card', () => {
        it('with folder', async () => {
            component.card = {
                objects: [
                    {
                        folder: 'test-folder/',
                        images: ['test-image.jpg']
                    } as CardObject
                ]
            } as Card
            component.ngOnInit()

            expect(component.imageSrc).toEqual('./assets/data/images/test-folder/m/test-image.jpg');
            expect(component.alt).toEqual('test-image.jpg');
        });
        it('without folder', async () => {
            component.card = {
                objects: [
                    {
                        images: ['test-image.jpg']
                    } as CardObject
                ]
            } as Card
            component.ngOnInit()

            expect(component.imageSrc).toEqual('./assets/data/images/m/test-image.jpg');
            expect(component.alt).toEqual('test-image.jpg');
        });

    });

    describe('should set the correct image source and alt for a CardObject', () => {
        it('with folder', async () => {
            component.object = {
                folder: 'test-folder/',
                images: ['test-image.jpg']
            } as CardObject;
            component.ngOnInit()

            expect(component.imageSrc).toEqual('./assets/data/images/test-folder/m/test-image.jpg');
            expect(component.alt).toEqual('test-image.jpg');
        });
        it('without folder', async () => {
            component.object = {
                images: ['test-image.jpg']
            } as CardObject;
            component.ngOnInit()

            expect(component.imageSrc).toEqual('./assets/data/images/m/test-image.jpg');
            expect(component.alt).toEqual('test-image.jpg');
        });

    });

    it('should set the correct image source and alt for a Image', async () => {
        component.image = 'test-image.jpg'

        component.ngOnInit();
        expect(component.imageSrc).toEqual('./assets/data/images/m/test-image.jpg');
        expect(component.alt).toEqual('test-image.jpg');
    });
});
