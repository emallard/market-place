import { Component, OnInit } from '@angular/core';
import { PublicController, InformationUtilisateur, UserController } from "app/_api/api";
import { FormInput } from "app/_core/forms";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  info = new InformationUtilisateur();
  test = true;
  ville = new FormInput();
  nom = new FormInput();

  constructor(private userController:UserController) { }

  async ngOnInit() {

    this.info = await this.userController.informationUtilisateurConnecte();
  }

  async rechercher() {
    
  }

}
