import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImageComponent } from '../components/card-image/card-image.component';
import { CollectionHeaderComponent } from '../components/collection-header/collection-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        CardImageComponent,
        CollectionHeaderComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        CardImageComponent,
        CollectionHeaderComponent
    ]
})
export class ComponentsModule { }
