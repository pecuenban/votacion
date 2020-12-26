import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { ConexionService } from "../conexion.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  registroInfo = {
    username: ""
  };
  loginInfo = {
    username: "",
    pass: ""
  };
  constructor(protected conexionService: ConexionService) {}
  error: boolean = false;
  ngOnInit() {}
  registro = false;
  form: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    pass: new FormControl("", [Validators.required])
  });
  form2: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email])
  });

  submit() {
    this.conexionService.autenticarUsuario(this.loginInfo).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });
  }
  submit2() {
    this.conexionService.registro(this.registroInfo).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
