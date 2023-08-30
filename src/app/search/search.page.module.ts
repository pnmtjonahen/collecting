import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';



import { SearchPageComponent } from './search.page';

@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
        {
            path: '',
            component: SearchPageComponent
        }
    ]),
    SearchPageComponent
]
})
export class SearchPageModule { }
