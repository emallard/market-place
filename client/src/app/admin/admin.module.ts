import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { TableauDeBordAdminComponent } from './tableau-de-bord-admin/tableau-de-bord-admin.component';
import { VendeursComponent } from './vendeurs/vendeurs.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { ReferencesComponent } from './references/references.component';
import { MessagesComponent } from './messages/messages.component';
import { RecherchesComponent } from './recherches/recherches.component';
import { AdminController } from "app/_api/api";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'admin', component:TableauDeBordAdminComponent,
        children: [
                { path: 'annonces',  component: AnnoncesComponent },
                { path: 'messages',  component: MessagesComponent },
                { path: 'recherches',  component: RecherchesComponent },
                { path: 'references',  component: ReferencesComponent },
                { path: 'vendeurs',  component: VendeursComponent },
            ]}
    ])
  ],
  declarations: [TableauDeBordAdminComponent, VendeursComponent, AnnoncesComponent, ReferencesComponent, MessagesComponent, RecherchesComponent],
  providers: [AdminController]
})
export class AdminModule { }
