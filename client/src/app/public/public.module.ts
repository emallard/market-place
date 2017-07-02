import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { RechercheProduitsComponent } from "app/public/recherche-produits/recherche-produits.component";
import { DevenirVendeurComponent } from './devenir-vendeur/devenir-vendeur.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SInscrireCommeVendeurComponent } from './s-inscrire-comme-vendeur/s-inscrire-comme-vendeur.component';
import { PublicController, UserController } from "app/_api/api";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [RechercheProduitsComponent, DevenirVendeurComponent, SeConnecterComponent, AccueilComponent, SInscrireCommeVendeurComponent],
  providers: [PublicController, UserController]
})
export class PublicModule { }
