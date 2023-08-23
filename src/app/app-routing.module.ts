import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('app/home/home.page.module').then(m => m.HomePageModule) },
    { path: 'card/:id', loadChildren: () => import('app/card/card.page.module').then(m => m.CardPageModule) },
    { path: 'search', loadChildren: () => import('app/search/search.page.module').then(m => m.SearchPageModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
