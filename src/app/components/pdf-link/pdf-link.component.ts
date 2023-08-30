import { Component, Input } from "@angular/core";
import { Pdf } from "app/services/collection.service";

@Component({
    selector: 'app-pdf-link',
    template: `<a href="./assets/data/{{pdf.file}}" target="_blank">{{pdf.name}}</a>`,
    standalone: true
})
export class PdfLinkComponent {
    @Input()
    pdf: Pdf;
}