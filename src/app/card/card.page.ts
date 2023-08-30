import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NavController, MenuController, IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { Card, CollectionService } from 'app/services/collection.service';
import { ShowdownService } from 'app/services/showdown.service';
import { register } from 'swiper/element/bundle';
import { KeepHtmlPipe } from 'app/pipes/keep-html.pipe';
import { CardImageComponent } from '../components/card-image/card-image.component';
import { NgFor, NgIf } from '@angular/common';
import { CollectionHeaderComponent } from '../components/collection-header/collection-header.component';
import { PdfLinkComponent } from 'app/components/pdf-link/pdf-link.component';

register();

@Component({
    // selector: 'app-card',
    templateUrl: './card.page.html',
    standalone: true,
    imports: [
        IonicModule,
        CollectionHeaderComponent,
        NgFor,
        CardImageComponent,
        NgIf,
        KeepHtmlPipe,
        PdfLinkComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CardPageComponent {

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
        private nav: NavController,
        private collectionService: CollectionService,
        private showdownService: ShowdownService,
        private activatedRoute: ActivatedRoute,
        private menuCtrl: MenuController) {

        this.name = this.collectionService.getName();
        this.logo = this.collectionService.getLogo();
    }

    ionViewWillEnter() {
        const cardId = this.activatedRoute.snapshot.paramMap.get('id');
        this.current = this.collectionService.findCardById(cardId);
    }
    convert(text: string| string[]) {
        return this.showdownService.makeHtml(text as string);
    }

    nextCard() {
        this.collectionService.nextCard(this.current);
    }
    prevCard() {
        this.collectionService.prevCard(this.current);
    }

    searchToggle() {
        this.nav.navigateForward('/search', {skipLocationChange: true});
    }

    menuToggle() {
        this.menuCtrl.toggle();
    }
}
