import { Injectable } from '@angular/core';
import showdown, { Converter } from 'showdown';

@Injectable({
  providedIn: 'root'
})
export class ShowdownService {
  private converter: Converter;
  constructor() {
    showdown.extension('internalLink', () => {
      return {
        type: 'output',
        regex: "href=\"(.*)\"",
        replace: (match: string, content: string) => {
          if (content.indexOf("#/") !== -1) {
            return "href=\"javascript:gotoCard('" + content.substring(2) + "')\"";
          }
          return match;
        }
      };
    });

    this.converter = new showdown.Converter({ tables: true, extensions: ['internalLink'] });
  }

  makeHtml(input: string) {
    return this.converter.makeHtml(input);
  }
}