
import { ShowdownService } from './showdown.service';

describe('ShowdownService', () => {
    let service: ShowdownService;
    beforeEach(() => service = new ShowdownService());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should render a correct internal link', () => {
        expect(service.makeHtml('[label](#/link)')).toEqual(`<p><a href="javascript:gotoCard('link')">label</a></p>`);
    });

    it('should render a correct external link', () => {
        expect(service.makeHtml('[label](http://www.label.com/)')).toEqual(`<p><a href="javascript:window.open('http://www.label.com/', '_blank')">label</a></p>`);
    });

});
