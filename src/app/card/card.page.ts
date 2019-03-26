import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, Events, NavController, MenuController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router'

import {Card, CollectionService} from 'app/services/collection.service';
import {ShowdownService} from 'app/services/showdown.service';


@Component({
    selector: 'app-card',
    templateUrl: './card.page.html',
    styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

    @ViewChild(IonContent) content: IonContent;
    current: Card = {
        id: 'loading',
        name: 'loading...',
        content: 'loading...',
        normalizedContent: 'loading...',
        cards: [],
        objects: [],
        pdf: []
    };
    name: string;
    logo: string;

    constructor(
        private events: Events,
        private nav: NavController,
        private collectionService: CollectionService,
        private showdownService: ShowdownService,
        private route: ActivatedRoute,
        private menuCtrl: MenuController) {

        this.name = this.collectionService.getName();
        this.logo = this.collectionService.getLogo();
    }

    ionViewWillEnter() {
        let cardId = this.route.snapshot.paramMap.get('id');
        this.current = this.collectionService.findCardById(cardId);
    }
    convert(text: string) {
        return this.showdownService.makeHtml(text);
    }

    nextCard() {
        this.events.publish('nextCard', this.current);
    }
    prevCard() {
        this.events.publish('prevCard', this.current);
    }

    searchToggle() {
        this.nav.navigateForward('/search');
    }

    menuToggle() {
        this.menuCtrl.toggle();
    }
    ngOnInit() {
    }

}