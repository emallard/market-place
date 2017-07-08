import { Component, OnInit, NgZone } from '@angular/core';
import { FormInput } from "app/_core/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserController } from "app/_api/api";


@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.css']
})
export class SeConnecterComponent implements OnInit {

  email = new FormInput();
  password = new FormInput();
  seSouvenirDeMoi = true;
  returnUrl:string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userController:UserController,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.email.value='';
    this.password.value='';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  async seConnecter()
  {
    this.email.errors.required = this.email.value == '';

    await this.userController.seConnecter(
      {
        email:this.email.value,
        password:this.password.value
      }
    );

    if (this.returnUrl != null)
      this.router.navigate([this.returnUrl]);

    var infos = await this.userController.informationUtilisateurConnecte();
    if (infos.estUnAdmin)
    {
      this.router.navigate(['/admin']);
    }
    if (infos.estUnVendeur)
    {
      this.router.navigate(['/vendeur']);
    }
  }
}
