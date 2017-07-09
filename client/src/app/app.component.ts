import { Component } from '@angular/core';
import { AlertService } from "app/alert.service";
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private alertService:AlertService)
  {
    this.alertService.onShowAlert((m) => this.afficherAlert(m));
  }
  
  ngOnInit() {
    $('#myModal').modal('hide');
  }

  modalMessage = 'pas de message';
  afficherAlert(message: string) {
    console.log('afficherAlert');
    this.modalMessage = message;
    $('#myModal').modal('show');
  }

}
