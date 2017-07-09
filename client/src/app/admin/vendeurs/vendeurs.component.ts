import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminController } from "app/_api/api";

@Component({
  selector: 'app-vendeurs',
  templateUrl: './vendeurs.component.html',
  styleUrls: ['./vendeurs.component.scss']
})
export class VendeursComponent implements OnInit, OnDestroy {

constructor(private adminController:AdminController) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  async listeVendeurs() {
     var liste = await this.adminController.listeVendeurs();
     var ref2 = liste.map(r=>[r.email, r.profil.nom, r.profil.prenom, r.dateInscription]);
     $('#datatable').DataTable({
         destroy:true,
         language: {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
         data:ref2, 
         columns:[{ title: "email"},{ title: "nom"}, {title: "prenom"}, {title: "inscription"}]
     });
  }
}
