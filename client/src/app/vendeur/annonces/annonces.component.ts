import { Component, OnInit } from '@angular/core';
import { VendeurController, Annonce } from "app/_api/api";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

constructor(
    private vendeurController: VendeurController) { }

  annonces:Annonce[] = [];

  ngOnInit() {

    this.vendeurController.tousLesAnnonces().then(result => 
    {
      this.annonces=result;
    });
  }
}
