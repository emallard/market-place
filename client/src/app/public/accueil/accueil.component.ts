import { Component, OnInit } from '@angular/core';
import { PublicController, InformationUtilisateur, UserController, RechercheAnnonce, ApiProduit, Annonce } from "app/_api/api";
import { FormInput } from "app/_core/forms";
import { CompleterService, CompleterData } from 'ng2-completer';
import { CommuneCompleterData } from "app/_core/CommuneCompleterData";
import { Router, NavigationExtras } from "@angular/router";

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
  
  customData:CommuneCompleterData; 

  constructor(
    private router: Router,
    private userController:UserController,
    private publicController:PublicController) { 
      this.customData = new CommuneCompleterData(publicController);
    }

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

    var d = $('.datetimepicker4').data("DateTimePicker").date();



    //var urlDto = await this.publicController.obtenirUrlDeRecherche(recherche);

    this.router.navigate(['/recherche', recherche]);

    /*
    var querystring = '?' + 'lieu='+this.lieu.value+'coord=' + longitude + '|' + latitude
    + '&produit=' + this.reference.value
    + '&date=' + .

    'fn=Les+Sables-d'Olonne&fc=46.492958|-1.795493&fcc=FR&fp=0&tn=La+Rochelle&tc=46.160329|-1.151139&tcc=FR&tp=0&db=21%2F07%2F2017
    this.lieu.value.replace(/ /gi, "-");
    this.lieu.value.replace(/'/gi, "-");
    */
    

/*
    this.router.navigate([redirect]);

    var recherche = new RechercheAnnonce();
    recherche.lieu = this.lieu.value;
    recherche.date = $('.datetimepicker4').data("DateTimePicker").date();
    recherche.reference = this.reference.value;

    this.annonces = await this.publicController.rechercherAnnonces(recherche);
    console.log(this.annonces);
  */
  }


}
