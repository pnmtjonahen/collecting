import {Component} from '@angular/core';
import {CollectionService} from '../../collection.service';

@Component({
  selector: 'collection-header',    
  templateUrl: './collection-header.component.html',
  styleUrls: ['./collection-header.component.scss'],
})
export class CollectionHeaderComponent {

    constructor(public collectionService: CollectionService) {
    }

    getName() {
        return this.collectionService.getName();
    }

    getLogo() {
        return this.collectionService.getLogo();
    }
}
