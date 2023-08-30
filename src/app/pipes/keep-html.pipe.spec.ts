import { DomSanitizer } from '@angular/platform-browser';
import { KeepHtmlPipe } from './keep-html.pipe';

describe('KeepHtmlPipe', () => {
    let sanitizerSpy;

    beforeEach(() => {
        sanitizerSpy = jasmine.createSpyObj(DomSanitizer, ['bypassSecurityTrustHtml']);
    });

    it('calls the sanitizer on transform', () => {
        sanitizerSpy.bypassSecurityTrustHtml.and.returnValue('sanitized');
        const pipe = new KeepHtmlPipe(sanitizerSpy);
        expect(pipe.transform('sample')).toEqual('sanitized');
        expect(sanitizerSpy.bypassSecurityTrustHtml).toHaveBeenCalledWith('sample');
    });

});
