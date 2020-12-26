import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ConexionService } from "../conexion.service";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  votados = 0;
  total = 5;
  votables = [];
  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    protected conexionService: ConexionService
  ) {}

  ngOnInit() {
    this.conexionService.votables().subscribe({
      next: data => {
        let obj: any = data;
        this.votables = obj;
      },
      error: error => {
        console.error(error);
      }
    });
  }
  salir() {
    this.router.navigate([""]);
  }
  votar(votable) {
    if (votable.votado) {
      this.openSnackBar("Ya has votado este villancico", "");
    } else {
      if (this.votados < this.total) {
        this.votados++;
        votable.votado = true;
        this.conexionService.votar(votable.id).subscribe({
          next: data => {
            this.openSnackBar("Has votado correctamente", "Deshacer");
          },
          error: error => {
            console.error(error);
          }
        });
      } else {
        this.openSnackBar("Ya has alcanzado el máximo de votos", "");
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
