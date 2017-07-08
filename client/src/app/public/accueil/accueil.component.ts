import { Component, OnInit } from '@angular/core';
import { PublicController, InformationUtilisateur, UserController, RechercheAnnonce, ApiProduit, Annonce } from "app/_api/api";
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

  lieu = new FormInput();
  date = new FormInput();
  reference = new FormInput();
  
  annonces: Annonce[] = [];
  
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
    var recherche = new RechercheAnnonce();
    recherche.lieu = this.lieu.value;
    recherche.date = $('.datetimepicker4').data("DateTimePicker").date();
    recherche.reference = this.reference.value;

    this.annonces = await this.publicController.rechercherAnnonces(recherche);
    console.log(this.annonces);
  }

}
