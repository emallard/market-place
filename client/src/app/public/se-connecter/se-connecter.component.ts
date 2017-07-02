import { Component, OnInit } from '@angular/core';
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
  returnUrl:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userController:UserController) { }

  ngOnInit() {
    this.email.value='b@b.b';
    this.password.value='aaaa';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

    this.router.navigate([this.returnUrl]);
  }
}
