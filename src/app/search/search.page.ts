import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Card, CollectionService } from 'app/services/collection.service';

@Component({
    selector: 'page-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage {
    myInput = '';
    cardList: Card[] = [];

    constructor(private navCtrl: NavController, private collectionService: CollectionService) {

    }

    search() {
        this.cardList = this.collectionService.search(this.myInput);
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
