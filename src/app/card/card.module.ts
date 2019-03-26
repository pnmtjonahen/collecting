import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CardPage} from './card.page';

import {KeepHtmlPipe} from 'app/pipes/keep-html.pipe';
import {ComponentsModule} from 'app/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: CardPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComponentsModule
    ],
    declarations: [
        CardPage,
        KeepHtmlPipe
        ]
})
export class CardPageModule {}

