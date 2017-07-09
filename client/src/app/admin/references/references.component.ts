import { Component, OnInit } from '@angular/core';
import { AdminController } from "app/_api/api";
import { AlertService } from "app/alert.service";

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {

  constructor(
    private adminController:AdminController,
    private alertService:AlertService,
  ) { }

  ngOnInit() {
  }

  async listeReferences() {
     var references = await this.adminController.listeReferences();
     var ref2 = references.map(r=>[r.titre, r.texte]);
     $('#datatable').DataTable({
         destroy:true,
         language: {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
         data:ref2, 
         columns:[{ title: "titre"},{ title: "texte"}]
     });
  }

  referencesEnCsv:string = "Thé vert;Ceci est du thé vert\nShampoing doux;Bon pour les cheveux";
  
  async ajouterReferences() {
    this.adminController.ajouterListeReferencesEnCsv({contenu: this.referencesEnCsv});
    this.alertService.showAlert("References ajoutées");
  }
}
