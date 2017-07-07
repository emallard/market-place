import { Component, OnInit } from '@angular/core';
import { VendeurController, Produit } from "app/_api/api";
import { FormInput } from "app/_core/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent implements OnInit {

  nom = new FormInput();
  prix = new FormInput();
  loading = false;
  
  constructor(
    private vendeurController: VendeurController,
    private router: Router) { }

  ngOnInit() {
  }

  async ajouterProduit()
  {
    var nouveauProduit = new Produit();
    nouveauProduit.nom = this.nom.value;
    nouveauProduit.prix = parseFloat(this.prix.value);

    await this.vendeurController.ajouterProduits(nouveauProduit);
    this.router.navigate(['/vendeur']);
  }

}
