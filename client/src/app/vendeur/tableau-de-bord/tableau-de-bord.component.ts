import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { VendeurController, ApiProduit, Produit } from "app/_api/api";
import { FormInput } from "app/_core/forms";

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vendeurController: VendeurController) { }

  produits:Produit[] = [{nom:'r', prix:1}];
  
  nom = new FormInput();
  prix = new FormInput();

  ngOnInit() {
    this.vendeurController.rechercherProduits().then(result => 
    {
      console.log(result);
      this.produits=result;
    });
  }


  ajouterProduit()
  {
    var nouveauProduit = new Produit();
    nouveauProduit.nom = this.nom.value;
    nouveauProduit.prix = parseFloat(this.prix.value);
    this.vendeurController.ajouterProduits(nouveauProduit);
  }
}
