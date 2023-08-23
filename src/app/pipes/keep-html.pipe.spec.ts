import { DomSanitizer } from '@angular/platform-browser';
import { KeepHtmlPipe } from './keep-html.pipe';

describe('KeepHtmlPipe', () => {
    let sanitizerSpy;

    beforeEach(() => {
        sanitizerSpy = jasmine.createSpyObj(DomSanitizer, ['bypassSecurityTrustHtml']);
    });
    it('create an instance', () => {
        const pipe = new KeepHtmlPipe(sanitizerSpy);
        expect(pipe).toBeTruthy();
    });
});
