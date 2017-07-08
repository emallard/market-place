import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { VendeurController, ApiProduit, Annonce, UserController, InformationUtilisateur } from "app/_api/api";
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
    private vendeurController: VendeurController,
    private userController: UserController) { }

  utilisateur:InformationUtilisateur;


  ngOnInit() {

    this.userController.informationUtilisateurConnecte().then(result => {
      console.log("utilisateur" , result);
      this.utilisateur=result;
    })
  }



}
