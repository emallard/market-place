import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { VendeurController } from "app/_api/api";
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { HomeComponent } from './home/home.component';
import { AnnoncesComponent } from './annonces/annonces.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'vendeur', component:TableauDeBordComponent,
        children: [
            { path: '',  component: HomeComponent },
            { path: 'annonces',  component: AnnoncesComponent },
        ]
      },
      {path: 'vendeur/produit/:id', component:TableauDeBordComponent},
      {path: 'vendeur/ajouter-produit', component:AjouterProduitComponent},
    ])
  ],
  
  declarations: [TableauDeBordComponent, AjouterProduitComponent, HomeComponent, AnnoncesComponent],

  providers: [VendeurController]
})
export class VendeurModule { }
