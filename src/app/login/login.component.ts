import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
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
  constructor(
    private _snackBar: MatSnackBar,
    protected conexionService: ConexionService,
    private router: Router
  ) {}
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
        localStorage.setItem("user", this.loginInfo.username);
        localStorage.setItem("pass", this.loginInfo.pass);
        this.router.navigate(["inicio"]);
        console.log(data);
      },
      error: error => {
        this.openSnackBar(
          "Error de autenticación, asegurate de estar registrado",
          "",
          2000
        );
      }
    });
  }
  submit2() {
    this.conexionService.registro(this.registroInfo).subscribe({
      next: data => {
        console.log(data);
        this.openSnackBar(
          "Te has registrado correctamente, te hemos mandado un mail con la contraseña",
          "",
          5000
        );
        this.registro = false;
      },
      error: error => {
        console.error(error);
      }
    });
  }
  openSnackBar(message: string, action: string, dur: number) {
    this._snackBar.open(message, action, {
      duration: dur
    });
  }
}
