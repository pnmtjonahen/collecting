import { Component } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { Card, CollectionService } from 'app/services/collection.service';
import { CardImageComponent } from '../components/card-image/card-image.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './search.page.html',
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        NgFor,
        NgIf,
        CardImageComponent,
    ],
})
export class SearchPageComponent {
    searchInput = '';
    cardList: Card[] = [];

    constructor(private navCtrl: NavController, private collectionService: CollectionService) {

    }

    search() {
        this.cardList = this.collectionService.search(this.searchInput);
        if (this.cardList.length === 0) {
            this.cardList.push({
                id: undefined,
                name: 'no search result.',
                content: undefined,
                normalizedContent: undefined,
                cards: undefined,
                objects: undefined,
                pdf: undefined
            });
        }
    }

    gotoCard(card: Card) {
        if (card.id !== undefined) {
            this.navCtrl.navigateForward(`/card/${card.id}`, {skipLocationChange: true});
        }
    }
}
