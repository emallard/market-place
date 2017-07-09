import { Component, OnInit } from '@angular/core';
import { AdminController } from "app/_api/api";
import { AlertService } from "app/alert.service";

@Component({
  selector: 'app-communes',
  templateUrl: './communes.component.html',
  styleUrls: ['./communes.component.scss']
})
export class CommunesComponent implements OnInit {

  constructor(
    private adminController:AdminController,
    private alertService:AlertService
  ) { }

  ngOnInit() {
  }

  csv:string;

  async mettreAJourCommunes()
  {
      var message = await this.adminController.mettreAJourCommunes({contenu:this.csv});
      this.alertService.showAlert(message);
  }
}
