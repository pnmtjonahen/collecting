import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG, BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
} from "@angular/material";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CardPageModule} from './card/card.module';
import {SearchPageModule} from './search/search.module';
import {ComponentsModule} from './components/components.module';

export class HammerConfig extends HammerGestureConfig {
  overrides: any = <any>{
    'pinch': {enable: false},
    'rotate': {enable: false}
  };
}

@NgModule({
    declarations: [
        AppComponent
    ],
    entryComponents: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        DragDropModule,
        ScrollingModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        HttpClientModule,
        CardPageModule,
        SearchPageModule,
        ComponentsModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
