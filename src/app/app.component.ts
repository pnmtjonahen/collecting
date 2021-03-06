import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Card, Collection, CollectionService } from 'app/services/collection.service';

// handle to this if no instance is available, like directly from outside the app
let that: AppComponent;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    cards: Card[];
    data: Collection;
    showLevel1: string = null;

    constructor(
        public platform: Platform,
        public splashScreen: SplashScreen,
        public statusBar: StatusBar,
        private navCtrl: NavController,
        private collectionService: CollectionService,
        public menu: MenuController

    ) {
        document.addEventListener('openCardEvent', this.onOpenCard, false);
        this.collectionService.onNextCard().subscribe((current: Card) => {
            const card: Card = this.collectionService.findNextCardById(current.id);
            if (card.id !== current.id) {
                this.navCtrl.navigateRoot(`/card/${card.id}`, {skipLocationChange: true});
            }
        });

        this.collectionService.onPrevCard().subscribe((current: Card) => {
            const card: Card = this.collectionService.findPrevCardById(current.id);
            if (card.id !== current.id) {
                this.navCtrl.navigateRoot(`/card/${card.id}`, {skipLocationChange: true});
            }
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            collectionService.load().then((data: Collection) => {
                this.data = data;
                this.cards = data.cards;
                const card: Card = data.cards[0];
                this.navCtrl.navigateRoot(`/card/${card.id}`, {skipLocationChange: true});
                // data is loaded, root page is set, lets hide splash
                splashScreen.hide();
            });
            statusBar.styleDefault();
            that = this;
        });
    }

    // open card from reference on page
    onOpenCard(e: CustomEvent) {
        that.navCtrl.navigateForward(`/card/${e.detail.id}`, {skipLocationChange: true});
    }

    // open page from menu
    openPage(card: Card): void {
        this.toggleLevel(card.id);
        if (this.hasSubLevel(card)) {
            this.menu.close();
            this.navCtrl.navigateRoot(`/card/${card.id}`, {skipLocationChange: true});
        }
    }

    toggleLevel(id: string) {
        if (this.isLevelShown(id)) {
            this.showLevel1 = null;
        } else {
            this.showLevel1 = id;
        }
    }

    isLevelShown(id: string) {
        return this.showLevel1 === id;
    }

    hasSubLevel(card: Card) {
        return card.cards === undefined;
    }
}
