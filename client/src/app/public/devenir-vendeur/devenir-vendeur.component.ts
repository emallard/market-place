import { Component, OnInit } from '@angular/core';
import { FormInput } from "app/_core/forms";
import { PublicController, Inscription, UserController } from "app/_api/api";

@Component({
  selector: 'app-devenir-vendeur',
  templateUrl: './devenir-vendeur.component.html',
  styleUrls: ['./devenir-vendeur.component.css']
})
export class DevenirVendeurComponent implements OnInit {

  email = new FormInput();
  password = new FormInput();
  boutique = new FormInput();
  
  loading = false;

  constructor(
    private userController:UserController) { }

  ngOnInit() {
  }

  async devenirVendeur() {
      console.log('devenirVendeur ',this.email.value , this.password.value , this.boutique.value);

      var inscription: Inscription = {email : this.email.value , password: this.password.value};
      await this.userController.inscrireVendeur(inscription);

      console.log('devenirVendeur OK');
  }

}
