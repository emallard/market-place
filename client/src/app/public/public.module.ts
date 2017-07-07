import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { RechercheProduitsComponent } from "app/public/recherche-produits/recherche-produits.component";
import { DevenirVendeurComponent } from './devenir-vendeur/devenir-vendeur.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PublicController, UserController } from "app/_api/api";
import { LandingComponent } from './landing/landing.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'landing', component:LandingComponent},
      {path: 'devenir-vendeur', component:DevenirVendeurComponent},
      {path: 'se-connecter', component:SeConnecterComponent},
      {path: '', component:AccueilComponent},
    ]),
  ],
  declarations: [RechercheProduitsComponent, DevenirVendeurComponent, SeConnecterComponent, AccueilComponent, LandingComponent],
  providers: [PublicController, UserController]
})
export class PublicModule { }
