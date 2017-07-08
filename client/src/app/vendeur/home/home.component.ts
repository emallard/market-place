import { Component, OnInit } from '@angular/core';
import { UserController, InformationUtilisateur, VendeurController, Annonce } from "app/_api/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private userController: UserController,
    private vendeurController: VendeurController) { }

  utilisateur:InformationUtilisateur;

  ngOnInit() {
    this.userController.informationUtilisateurConnecte().then(result => {
      this.utilisateur=result;
    })
  }

}
