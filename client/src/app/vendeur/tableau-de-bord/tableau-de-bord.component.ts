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

  produits:Produit[] = [];
  


  ngOnInit() {
    this.vendeurController.tousLesProduits().then(result => 
    {
      console.log(result);
      this.produits=result;
    });
  }



}
