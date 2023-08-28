import { Component } from '@angular/core';
import { CollectionService } from 'app/services/collection.service';
import { IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-collection-header',
    template: `
    <img
        alt="logo"
        height="40"
        *ngIf="logo !== undefined"
        src="./assets/data/images/{{logo}}"
        width="40px"
        style="display:inline-block"
        height="40px" >
    <ion-title class="titleicon" style="display:inline-block" >{{name}}</ion-title>`,
    standalone: true,
    imports: [NgIf, IonicModule]
})
export class CollectionHeaderComponent {

    constructor(private collectionService: CollectionService) {
    }

    get name() {
        return this.collectionService.getName();
    }

    get logo() {
        return this.collectionService.getLogo();
    }
}
