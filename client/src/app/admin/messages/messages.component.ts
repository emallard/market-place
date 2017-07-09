import { Component, OnInit } from '@angular/core';
import { AdminController } from "app/_api/api";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private adminController:AdminController) { }

  ngOnInit() {
  }

  async listeEmails() {
     var annonces = await this.adminController.listeEmails();
     var ref2 = annonces.map(r=>[r.date, r.to, r.subject]);
     $('#datatable').DataTable({
       destroy:true,
         language: {"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
         data:ref2, 
         columns:[{ title: "date"},{ title: "destinataire"}, {title: "objet"}]
     });
  }
}
