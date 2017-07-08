import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AlertService } from "app/alert.service";
import { DevenirVendeurComponent } from "app/public/devenir-vendeur/devenir-vendeur.component";
import { SeConnecterComponent } from "app/public/se-connecter/se-connecter.component";
import { PublicModule } from "app/public/public.module";
import { AccueilComponent } from "app/public/accueil/accueil.component";
import { VendeurModule } from "app/vendeur/vendeur.module";
import { ClientModule } from "app/client/client.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    PublicModule,
    VendeurModule,
    ClientModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
