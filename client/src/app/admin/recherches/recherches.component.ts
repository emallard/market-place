import { Component, OnInit } from '@angular/core';
import { AdminController } from "app/_api/api";

@Component({
  selector: 'app-recherches',
  templateUrl: './recherches.component.html',
  styleUrls: ['./recherches.component.scss']
})
export class RecherchesComponent implements OnInit {

  constructor(private adminController:AdminController) { }

  ngOnInit() {
  }

  async listeLogRecherches() {
     var liste = await this.adminController.listeLogRecherches();
     var ref2 = liste.map(r=>[r.dateInsertion, r.lieu, r.reference, r.date]);
     $('#datatable').DataTable({
       destroy:true,
         language: {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
         data:ref2, 
         columns:[{ title: "dateInsertion"},{ title: "lieu"}, {title: "reference"}, {title: "date"}]
     });
  }
}
