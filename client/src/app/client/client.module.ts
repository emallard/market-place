import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'tableau-de-bord', component:TableauDeBordComponent},
    ]),
  ],
  declarations: [TableauDeBordComponent]
})
export class ClientModule { }
