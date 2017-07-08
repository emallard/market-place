import { Component, OnInit } from '@angular/core';
import { PublicController, InformationUtilisateur, UserController, RechercheProduit, ApiProduit } from "app/_api/api";
import { FormInput } from "app/_core/forms";
declare var $;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css', '../../styles/app.scss']
})
export class AccueilComponent implements OnInit {

  info = new InformationUtilisateur();
  test = true;
  ville = new FormInput();
  nom = new FormInput();
  produitsTrouves: ApiProduit[] = [];
  
  constructor(
    private userController:UserController,
    private publicController:PublicController) { }

  async ngOnInit() {

    this.info = await this.userController.informationUtilisateurConnecte();
  }

  ngAfterViewInit() {
    $('.datetimepicker4').datetimepicker({locale: 'fr', format: 'DD/MM/YYYY'});
  }

  async rechercher() {
    var recherche = new RechercheProduit();
    recherche.nom = this.nom.value;
    this.produitsTrouves = await this.publicController.rechercherProduits(recherche);
    console.log(this.produitsTrouves);
  }

}
