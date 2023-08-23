import { Component } from '@angular/core';
import { CollectionService } from 'app/services/collection.service';

@Component({
    selector: 'app-collection-header',
    template: `
    <img
        alt="logo"
        height="40"
        *ngIf="getLogo() !== undefined"
        src="./assets/data/images/{{getLogo()}}"
        width="40px"
        style="display:inline-block"
        height="40px" >
    <ion-title class="titleicon" style="display:inline-block" >{{getName()}}</ion-title>`
})
export class CollectionHeaderComponent {

    constructor(private collectionService: CollectionService) {
    }

    getName() {
        return this.collectionService.getName();
    }

    getLogo() {
        return this.collectionService.getLogo();
    }
}
