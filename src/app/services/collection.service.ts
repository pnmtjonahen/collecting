import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Collection {
    name: string;
    logo: string;
    cards: Card[];
}

export interface CardObject {
    name: string;
    folder: string;
    content?: string | string[];
    images: string[];
}

export interface Pdf {
    name: string;
    file: string;
}

export interface Card {
    id: string;
    name: string;
    content: string | string[];
    normalizedContent?: string;
    cards?: Card[];
    objects?: CardObject[];
    pdf?: Pdf[];
}

@Injectable({
    providedIn: 'root'
})
export class CollectionService {
    data: Collection;
    contentCards: Card[] = [];

    private nextCardSubject: Subject<Card> = new Subject<Card>();
    private prevCardSubject: Subject<Card> = new Subject<Card>();

    constructor(private http: HttpClient) {

    }

    load(): Promise<Collection> {
        if (this.data) {
            // already loaded and processed data
            return Promise.resolve(this.data);
        }
        return new Promise(resolve => {
            this.http.get('assets/data/cards.json').subscribe(data => {
                this.data = <Collection>data;
                this.process(this.data);
                resolve(this.data);
            });
        });
    }

    private process(data: Collection) {
        data.cards.forEach(c => this.makeContent(c));
    }

    private makeContent(card: Card) {
        if (Array.isArray(card.content)) {
            let content = '';
            card.content.forEach(c => { content = content + c + '\n'; });
            card.content = content;
            card.normalizedContent = card.content?.toLowerCase();
        }
        if (card.cards) {
            card.cards.forEach(c => this.makeContent(c));
        } else {
            this.contentCards.push(card);
        }
        if (card.objects) {
            card.objects.forEach(o => {
                if (Array.isArray(o.content)) {
                    let content = '';
                    o.content.forEach(c => { content = content + c + '\n'; });
                    o.content = content;
                    if (card.normalizedContent) {
                        card.normalizedContent += ' ' + content?.toLowerCase();
                    } else {
                        card.normalizedContent = content?.toLowerCase();
                    }
                }
            });
        } else {
            card.objects = [];
        }

        card.normalizedContent = this.normalizeContent(card) + ' ' + card.name?.toLowerCase();
    }

    private normalizeContent(card: Card) : string{
        if (card.normalizedContent !== undefined) {
            return card.normalizedContent.replace(/(\b(\w{1,3})\b(\W|$))|(\n)/g, ' ');
        }
        return '';
    }

    private findIndexById(id: string) : number{
        if (id === undefined) {
            return 0;
        }
        let index = 0;
        this.contentCards.forEach((c, i) => {
            if (c.id === id) {
                index = i;
            }
        });
        return index;
    }

    findCardById(id: string) : Card {
        if (id === undefined) {
            return this.data.cards[0];
        }
        let card: Card = this.data.cards[0];
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

    findNextCardById(id: string) : Card  {
        const nextIndex: number = this.findIndexById(id) + 1;
        if (nextIndex > this.contentCards.length - 1) {
            return this.contentCards[0];
        }
        return this.contentCards[nextIndex];

    }

    findPrevCardById(id: string) : Card {
        const prevIndex: number = this.findIndexById(id) - 1;
        if (prevIndex < 0) {
            return this.contentCards[this.contentCards.length - 1];
        }
        return this.contentCards[prevIndex];
    }

    search(argument: string): Card[] {
        const result: Card[] = [];
        if (argument.length >= 1) {
            this.contentCards.forEach(c => {
                if (c.normalizedContent.includes(argument.toLowerCase())) {
                    result.push(c);
                }
            });
        }

        return result;
    }

    getLogo(): string {
        if (this.data === undefined) {
            return undefined;
        }
        return this.data.logo;
    }

    getName(): string {
        if (this.data === undefined) {
            return 'loading...';
        }
        return this.data.name;
    }


    nextCard(card: Card) {
        this.nextCardSubject.next(card);
    }

    onNextCard(): Subject<Card> {
        return this.nextCardSubject;
    }

    prevCard(card: Card) {
        this.prevCardSubject.next(card);
    }

    onPrevCard(): Subject<Card> {
        return this.prevCardSubject;
    }
}
