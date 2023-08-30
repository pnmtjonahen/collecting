import { Component, OnInit, Input } from '@angular/core';
import { Card, CardObject } from 'app/services/collection.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-card-image',
    template: '<img *ngIf="imageSrc !== undefined" src="{{imageSrc}}" alt="{{alt}}" style="margin-left: auto; margin-right: auto; display: block;"/>',
    standalone: true,
    imports: [NgIf]
})
export class CardImageComponent implements OnInit {

    @Input()
    card: Card;
    @Input()
    object: CardObject;
    @Input()
    image: string;

    imageSrc: string;
    alt: string;

    ngOnInit(): void {
        let folder = '';
        let name: string;
        if (this.object) {
            folder = this.object.folder ?? '';
            name = this.object.images[0];
        }
        if (this.card?.objects[0]) {
            folder = this.card.objects[0].folder ?? '';
            name = this.card.objects[0].images[0];
        }
        if (this.image) {
            name = this.image;
        }
        if (name !== undefined) {
            this.imageSrc = './assets/data/images/' + folder + 'm/' + name;
            this.alt = name;
        }
    }

}
