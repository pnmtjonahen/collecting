import { Component, OnInit, Input } from '@angular/core';
import { Card, CardObject } from 'app/services/collection.service';

@Component({
    selector: 'card-image',
    template: '<img *ngIf="imageSrc !== undefined" src="{{imageSrc}}" alt="{{alt}}"/>'
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

    constructor() {
    }

    ngOnInit() {
        let folder: string;
        let name: string;

        if (this.object) {
            folder = (this.object.folder === undefined) ? '' : this.object.folder;
            name = this.object.images[0] === undefined
                ? undefined
                : this.object.images[0].name === undefined
                    ? this.object.images[0]
                    : this.object.images[0].name;
        }
        if (this.card && this.card.objects[0] !== undefined) {
            folder = this.card.objects[0].folder === undefined ? '' : this.card.objects[0].folder;
            name = this.card.objects[0].images[0] === undefined
                ? undefined
                : this.card.objects[0].images[0].name === undefined
                    ? this.card.objects[0].images[0]
                    : this.card.objects[0].images[0].name;
        }
        if (this.image) {
            name = this.image.name === undefined ? this.image : this.image.name;
        }
        if (name !== undefined) {
            this.imageSrc = './assets/data/images/' + folder + 'm/' + name;
            this.alt = name;
        }
    }

}
