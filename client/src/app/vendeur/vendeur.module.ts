import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { VendeurController } from "app/_api/api";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'vendeur', component:TableauDeBordComponent},
      {path: 'vendeur/produit/:id', component:TableauDeBordComponent},
    ])
  ],
  
  declarations: [TableauDeBordComponent],

  providers: [VendeurController]
})
export class VendeurModule { }
