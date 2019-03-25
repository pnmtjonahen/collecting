import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Collection {
    name: string;
    logo: string;
    cards: Card[];
}

export interface CardObject {
    folder: string;
    content: string;
    images: any[];
}

export interface Pdf {
    name: string;
    file: string;
}

export interface Card {
    id: string;
    name: string;
    content: string;
    normalizedContent: string;
    cards: Card[];
    objects: CardObject[];
    pdf: Pdf[];
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
    data: Collection;
    contentCards: Card[] = [];
    constructor(public http: HttpClient) {

    }

    load(): any {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/cards.json').subscribe(data => {
                this.data = <Collection>data;
                this.process(this.data);
                resolve(data);
            });
        });
    }

    private process(data: Collection) {
        data.cards.forEach(c => this.makeContent(c));
    }

    private makeContent(card: Card) {
        if (Array.isArray(card.content)) {
            var content = "";
            card.content.forEach(c => { content = content + c + "\n"; });
            card.content = content;
            card.normalizedContent = card.content.toLowerCase();
        }
        if (card.cards) {
            card.cards.forEach(c => this.makeContent(c));
        } else {
            this.contentCards.push(card);
        }
        if (card.objects) {
            card.objects.forEach(o => {
                if (Array.isArray(o.content)) {
                    var content = "";
                    o.content.forEach(c => { content = content + c + "\n"; });
                    o.content = content;
                    card.normalizedContent += " " + content.toLowerCase();
                }
            });
        } else {
            card.objects = [];
        }

        card.normalizedContent = this.normalizeContent(card) + " " + card.name.toLowerCase();
    }

    private normalizeContent(card: Card) {
        if (card.normalizedContent !== undefined) {
            return card.normalizedContent.replace(/(\b(\w{1,3})\b(\W|$))/g, '');
        }
        return "";
    }

    private findIndexById(id: string) {
        if (id === undefined) {
            return 0;
        }
        var index: number = 0;
        this.contentCards.forEach((c, i) => {
            if (c.id === id) {
                index = i;
            }
        });
        return index;
    }

    findCardById(id: string) {
        if (id === undefined) {
            return this.data.cards[0];
        }
        var card: Card = this.data.cards[0];
        this.data.cards.forEach(c => {
            if (c.id === id) {
                card = c;
            }
            if (c.cards !== undefined) {
                c.cards.forEach(sc => {
                    if (sc.id === id) {
                        card = sc;
                    }
                });
            }
        });
        return card;
    }

    findNextCardById(id: string) {
        let nextIndex: number = this.findIndexById(id) + 1;
        if (nextIndex > this.contentCards.length - 1) {
            return this.contentCards[0];
        }
        return this.contentCards[nextIndex];

    }

    findPrevCardById(id: string) {
        let prevIndex: number = this.findIndexById(id) - 1;
        if (prevIndex < 0) {
            return this.contentCards[this.contentCards.length - 1];
        }
        return this.contentCards[prevIndex];
    }

    search(argument: string) {
        let result: Card[] = [];
        if (argument.length >= 1) {
            this.contentCards.forEach(c => {
                if (c.normalizedContent.includes(argument.toLowerCase())) {
                    result.push(c);
                }
            });
        }

        return result;
    }
    
    getLogo() {
        if (this.data === undefined) {
            return undefined;
        }
        return this.data.logo;
    }
    
    getName() {
        if (this.data === undefined) {
            return "loading...";
        }
        return this.data.name;
    }
    
}
