import { Component, OnInit } from '@angular/core';
import { Annonce, PublicController, UrlDto, RechercheAnnonce } from "app/_api/api";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss']
})
export class ResultatsComponent implements OnInit {

  annonces: Annonce[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publicController:PublicController) { }

  async ngOnInit() {
    /*
    console.log(this.route.paramMap.map((params: ParamMap) =>
      this.service.getHero(params.get('id')))
    .subscribe((hero: Hero) => this.hero = hero););
    */

    var recherche = new RechercheAnnonce();
    recherche.lieu = this.route.snapshot.paramMap.get('lieu');
    recherche.date = new Date(Date.parse(this.route.snapshot.paramMap.get('date')));
    recherche.reference = this.route.snapshot.paramMap.get('reference');

    //var urlDto:UrlDto = {url : window.location.search.substring(3)};
    console.log(recherche);
    this.annonces = await this.publicController.rechercherAnnonces(recherche);
  }

}
