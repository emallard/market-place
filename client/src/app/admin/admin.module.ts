import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { TableauDeBordAdminComponent } from './tableau-de-bord-admin/tableau-de-bord-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'admin', component:TableauDeBordAdminComponent}
    ])
  ],
  declarations: [TableauDeBordAdminComponent]
})
export class AdminModule { }
