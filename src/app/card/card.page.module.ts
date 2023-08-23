import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardPageComponent } from './card.page';

import { KeepHtmlPipe } from 'app/pipes/keep-html.pipe';
import { ComponentsModule } from 'app/components/components.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: CardPageComponent
            }
        ]),
        ComponentsModule
    ],
    declarations: [
        CardPageComponent,
        KeepHtmlPipe
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardPageModule { }

