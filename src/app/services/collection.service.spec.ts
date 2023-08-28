import { of } from 'rxjs';
import { Card, CollectionService } from './collection.service';

describe('CollectionService', () => {

    let component: CollectionService;
    let httpClientSpy;

    const testdata = `
    {
        "name": "testname",
        "logo": "testlogo",
        "cards": [
            {
                "id": "id1",
                "name": "name1",
                "content": [
                    "content1",
                    "content2"
                ]
            },
            {
                "id": "menuitem_id",
                "name": "menuitem_name",
                "cards": [
                    {
                        "id": "id2",
                        "name": "name2",
                        "content": "subcontent2",
                        "objects": [
                            {
                                "id": "subid21",
                                "name": "subname21",
                                "content": [
                                    "subcontent21"
                                ]
                            },
                            {
                                "id": "subid22",
                                "name": "subname22",
                                "content": [
                                    "subcontent22"
                                ]
                            }
                        ]
                    },
                    {
                        "id": "id3",
                        "name": "name3",
                        "content": "subcontent3",
                        "objects": [
                            {
                                "id": "subid31",
                                "name": "subname31",
                                "content": [
                                    "subcontent31"
                                ]
                            },
                            {
                                "id": "subid32",
                                "name": "subname32",
                                "content": [
                                    "subcontent32"
                                ]
                            }
                        ]
                    }

                ]
            }
        ]
    }`
    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        component = new CollectionService(httpClientSpy);
    });

    describe('loading data', () => {
        it('loads and processes data', () => {
            const collection = JSON.parse(testdata);
            httpClientSpy.get.and.returnValue(of({ ...collection }));
            component.load();
            expect(component.data).toEqual(collection);
            expect(component.contentCards.length).toBe(3);
            expect(component.data.cards[0].content).toEqual(`content1
content2
`);
            expect(component.data.cards[1].cards[0].content).toEqual('subcontent2');
            expect(component.data.cards[1].cards[0].normalizedContent).toEqual('subcontent21  subcontent22  name2');

        })

        it('no re-loading and re-processing data', () => {
            const collection = JSON.parse(testdata);
            component.data = collection;
            component.load();
            expect(component.data).toEqual(collection);
            expect(component.contentCards.length).toBe(0);
        })
    });

    describe('navigate direct to a card', () => {
        beforeEach(() => {
            const collection = JSON.parse(testdata);
            httpClientSpy.get.and.returnValue(of({ ...collection }));
            component = new CollectionService(httpClientSpy);
            component.load();
        });

        it('findCardById', () => {
            expect(component.findCardById('id1').name).toEqual('name1');
        });

        it('findCardById sub card', () => {
            expect(component.findCardById('id2').name).toEqual('name2');
        });

        it('findCardById undefined returns first', () => {
            expect(component.findCardById(undefined).name).toEqual('name1');
        });
    });

    describe('navigate between cards', () => {
        beforeEach(() => {
            const collection = JSON.parse(testdata);
            httpClientSpy.get.and.returnValue(of({ ...collection }));
            component = new CollectionService(httpClientSpy);
            component.load();
        });

        it('findNextCardById', () => {
            expect(component.findNextCardById('id2').id).toEqual('id3');
        });

        it('findNextCardById wrap to first card', () => {
            expect(component.findNextCardById('id3').id).toEqual('id1');
        });

        it('findNextCardById unknown card gets first', () => {
            expect(component.findNextCardById(undefined).id).toEqual('id2');
        });

        it('findPrevCardById', () => {
            expect(component.findPrevCardById('id2').id).toEqual('id1');
        });

        it('findPrevCardById wrap to last card', () => {
            expect(component.findPrevCardById('id1').id).toEqual('id3');
        });

        it('findPrevCardById unknown card gets first', () => {
            expect(component.findPrevCardById(undefined).id).toEqual('id3');
        });
    });

    describe('getLogo', () => {
        it('returns undefined when no data is loaded', () => {
            expect(component.getLogo()).toBeUndefined()
        });
        it('returns logo when data is loaded', () => {
            const collection = JSON.parse(testdata);
            component.data = collection;
            expect(component.getLogo()).toEqual('testlogo');
        });
    });

    describe('getName', () => {
        it('returns loading... when no data is loaded', () => {
            expect(component.getName()).toEqual('loading...')
        });
        it('returns name when data is loaded', () => {
            const collection = JSON.parse(testdata);
            component.data = collection;
            expect(component.getName()).toEqual('testname');
        });
    });

    describe('Next and Prev subjects available', () => {
        it('returns a next subject', () => {
            expect(component.onNextCard()).toBeDefined();
        });
        it('returns a prev subject', () => {
            expect(component.onPrevCard()).toBeDefined();
        });
    });

    describe('triggers subjects', () => {
        it('triggers next', (done) => {
            component.onNextCard().subscribe((card) => {
                expect(card).toBeDefined();
                done();
            });
            component.nextCard({} as Card);
        });
        it('triggers prev', (done) => {
            component.onPrevCard().subscribe((card) => {
                expect(card).toBeDefined();
                done();
            });
            component.prevCard({} as Card);
        });
    });

    describe('serach cards', () => {
        beforeEach(() => {
            const collection = JSON.parse(testdata);
            httpClientSpy.get.and.returnValue(of({ ...collection }));
            component = new CollectionService(httpClientSpy);
            component.load();
        });

        it('needs more then 1 chars as input', () => {
            expect(component.search('')).toEqual([]);
            expect(component.search('a')).not.toEqual([]);
        });

        it('finds a content card', () => {
            expect(component.search('content').length).toEqual(3);
        });
        it('finds a content card', () => {
            expect(component.search('content22').length).toEqual(1);
        });
    });
});
