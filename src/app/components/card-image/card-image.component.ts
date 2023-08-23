import { Component, OnInit, Input } from '@angular/core';
import { Card, CardObject } from 'app/services/collection.service';

@Component({
    selector: 'card-image',
    template: '<img *ngIf="imageSrc !== undefined" src="{{imageSrc}}" alt="{{alt}}" style="margin-left: auto; margin-right: auto; display: block;"/>'
})
export class CardImageComponent implements OnInit {

    @Input()
    card: Card;
    @Input()
    object: CardObject;
    @Input()
    image: any;

    imageSrc: string;
    alt: string;

    ngOnInit(): void {
        let folder: string;
        let name: string;

        if (this.object) {
            folder = this.object.folder ?? '';
            name = this.determineName(this.object.images[0]);
        }
        if (this.card?.objects[0]) {
            folder = this.card.objects[0].folder ?? '';
            name = this.determineName(this.card.objects[0].images[0]);
        }
        if (this.image) {
            name = this.image.name === undefined ? this.image : this.image.name;
        }
        if (name !== undefined) {
            this.imageSrc = './assets/data/images/' + folder + 'm/' + name;
            this.alt = name;
        }
    }

    determineName(firstImage: any): string {
        return firstImage?.name ?? firstImage;
    }
}
