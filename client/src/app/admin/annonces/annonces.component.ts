import { Component, OnInit } from '@angular/core';
import 'datatables.net';
import { AdminController } from "app/_api/api";

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  constructor(private adminController:AdminController) { }

  ngOnInit() {
  }


  async listeAnnonces() {
     var annonces = await this.adminController.listeAnnonces();
     var ref2 = annonces.map(r=>[r.lieu, r.titreReference, r.date]);
     console.log('annonces', annonces);
     $('#datatable').DataTable({
       destroy:true,
         language: {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
         data:ref2, 
         columns:[{ title: "lieu"},{ title: "titre"}, {title: "date"}]
     });
  }

}
