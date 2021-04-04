import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule  } from "@angular/fire/firestore";

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Templates
import { DefaultTemplateComponent } from './templates/default.template/default.template.component';

// Pages
import { MiningPageComponent } from './pages/mining/mining.page.component';
import { AbyssPageComponent } from './pages/abyss/abyss.page.component';
import { AddAbyssPageComponent } from './pages/abyss/add-abyss/add-abyss.page.component';

// Components
import { ItemRowComponent } from './components/item-row/item-row.component';
import { TradePageComponent } from './pages/trade/trade.page.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    // Material
    MatButtonModule,
    MatButtonToggleModule,

    AppRoutingModule,
  ],
  declarations: [
    AppComponent,

    // Templates
    DefaultTemplateComponent,

    // Pages
    MiningPageComponent,
    AbyssPageComponent,
    AddAbyssPageComponent,
    TradePageComponent,

    // Components
    ItemRowComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
