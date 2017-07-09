import { Component, OnInit } from '@angular/core';
import { VendeurController, Annonce, Reference, AjoutAnnonce, PublicController } from "app/_api/api";
import { FormInput } from "app/_core/forms";
import { Router } from "@angular/router";
import { CommuneCompleterData } from "app/_core/CommuneCompleterData";
declare var $;

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {

  lieu = new FormInput();
  date = new FormInput();
  produit = new FormInput();
  idReference = new FormInput();

  references:Reference[];

  loading = false;
  
  customData:CommuneCompleterData; 

  constructor(
    private router: Router,
    private vendeurController: VendeurController,
    private publicController:PublicController
    ) { 
      this.customData = new CommuneCompleterData(publicController);
    }

  ngOnInit() {
    this.vendeurController.listerReferences().then(result => this.references = result);
  }
  
  ngAfterViewInit() {
    $('.datetimepicker4').datetimepicker({locale: 'fr', format: 'DD/MM/YYYY'});
  }

  async ajouterAnnonce()
  {
    var ajout = new AjoutAnnonce();
    ajout.lieu = this.lieu.value;
    ajout.date =  $('.datetimepicker4').data("DateTimePicker").date();
    ajout.idReference = {_id: this.idReference.value}

    await this.vendeurController.ajouterAnnonce(ajout);
    this.router.navigate(['/vendeur/annonces']);
  }

}
