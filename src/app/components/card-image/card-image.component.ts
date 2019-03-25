import {Component, OnInit, Input} from '@angular/core';
import {Card, CardObject} from '../../collection.service';

@Component({
    selector: 'card-image',
    template: '<img *ngIf="image !== undefined" src="{{image}}" alt="{{alt}}"/>',
    styleUrls: ['./card-image.component.scss'],
})
export class CardImageComponent implements OnInit {

    @Input("card") card: Card;
    @Input("object") object: CardObject;
    @Input("image") objectImage: any;

    image: string;
    alt: string;

    constructor() {
    }

    ngOnInit() {
        var folder: string;
        var name: string;

        if (this.object) {
            folder = (this.object.folder === undefined) ? '' : this.object.folder;
            name = this.object.images[0] === undefined ? undefined : this.object.images[0].name === undefined ? this.object.images[0] : this.object.images[0].name;
        }
        if (this.card && this.card.objects[0] !== undefined) {
            folder = this.card.objects[0].folder === undefined ? '' : this.card.objects[0].folder;
            name = this.card.objects[0].images[0] === undefined ? undefined : this.card.objects[0].images[0].name === undefined ? this.card.objects[0].images[0] : this.card.objects[0].images[0].name;
        }
        if (this.objectImage) {
            name = this.objectImage.name === undefined ? this.objectImage : this.objectImage.name;
        }
        if (name !== undefined) {
            this.image = "./assets/data/images/" + folder + "m/" + name;
            this.alt = name;
        }
    }

}
