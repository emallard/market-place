import { Component, OnInit } from '@angular/core';
import { FormInput } from "app/_core/forms";
import { PublicController, Inscription, UserController } from "app/_api/api";
import { Router } from "@angular/router";

@Component({
  selector: 'app-devenir-vendeur',
  templateUrl: './devenir-vendeur.component.html',
  styleUrls: ['./devenir-vendeur.component.css']
})
export class DevenirVendeurComponent implements OnInit {

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

  async devenirVendeur() {
      //console.log('devenirVendeur ',this.email.value , this.password.value , this.boutique.value);

      var inscription: Inscription = {
        email : this.email.value , 
        password: this.password.value,
        nom: this.nom.value,
        prenom: this.prenom.value,
        genre: this.genre.value,
      };
      await this.userController.inscrireVendeur(inscription);

      this.router.navigate(['/vendeur']);
      //console.log('devenirVendeur OK');
  }

}
