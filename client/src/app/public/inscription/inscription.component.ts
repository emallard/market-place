import { Component, OnInit } from '@angular/core';
import { FormInput } from "app/_core/forms";
import { UserController, Inscription } from "app/_api/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

 genre = new FormInput();
  nom = new FormInput();
  prenom = new FormInput();
  email = new FormInput();
  password = new FormInput();
  confirmerpassword = new FormInput();
  
  loading = false;

  constructor(
    private router: Router,
    private userController:UserController) { }

  ngOnInit() {
  }

  async inscription() {
      //console.log('devenirVendeur ',this.email.value , this.password.value , this.boutique.value);

      var inscription: Inscription = {email : this.email.value , password: this.password.value};
      await this.userController.inscrireVendeur(inscription);

      this.router.navigate(['/tableau-de-bord']);
      //console.log('devenirVendeur OK');
  }
}
