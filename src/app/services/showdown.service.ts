import { Injectable } from '@angular/core';
import { extension, Converter } from 'showdown';

@Injectable({
  providedIn: 'root'
})
export class ShowdownService {
  private converter: Converter;
  constructor() {
    extension('internalLink', () => {
      return {
        type: 'output',
        regex: 'href="(.*)"',
        replace: (match: string, content: string) => {
          if (content.indexOf('#/') !== -1) {
            return 'href="javascript:gotoCard(\'' + content.substring(2) + '\')"';
          } else {
            return 'href="javascript:window.open(\'' + content + '\', \'_system\', \'location=yes\')"';
          }
          return match;
        }
      };
    });

    this.converter = new Converter({ tables: true, extensions: ['internalLink'] });
  }

  makeHtml(input: string) {
    return this.converter.makeHtml(input);
  }
}