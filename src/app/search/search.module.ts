import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'app/components/components.module';


import { SearchPage } from './search.page';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: SearchPage
            }
        ]),
        ComponentsModule
    ],
    declarations: [SearchPage]
})
export class SearchPageModule { }
