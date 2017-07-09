import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { DevenirVendeurComponent } from './devenir-vendeur/devenir-vendeur.component';
import { SeConnecterComponent } from './se-connecter/se-connecter.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PublicController, UserController } from "app/_api/api";
import { LandingComponent } from './landing/landing.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ResultatsComponent } from './resultats/resultats.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2CompleterModule,
    RouterModule.forRoot([
      {path: 'landing', component:LandingComponent},
      {path: 'devenir-vendeur', component:DevenirVendeurComponent},
      {path: 'se-connecter', component:SeConnecterComponent},
      {path: '', component:AccueilComponent},
      {path: 'recherche', component:ResultatsComponent},
    ]),
  ],
  declarations: [DevenirVendeurComponent, SeConnecterComponent, AccueilComponent, LandingComponent, InscriptionComponent, ResultatsComponent],
  providers: [PublicController, UserController]
})
export class PublicModule { }
