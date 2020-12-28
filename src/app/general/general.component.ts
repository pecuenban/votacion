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
        this.conexionService.misVotos().subscribe({
          next: data => {
            let obj2: any = data;
            for (let i = 0; i < obj2.length; i++) {
              for (let j = 0; j < this.votables.length; j++) {
                if (this.votables[j].id == obj2[i].id_votable) {
                  this.votables[j].votado = true;
                  this.votados++;
                }
              }
            }
            console.log(data);
          },
          error: error => {
            console.error(error);
          }
        });
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
      this.openSnackBar("Ya has votado este villancico", "", 2000);
    } else {
      if (this.votados < this.total) {
        this.conexionService.votar(votable.id).subscribe({
          next: data => {
            this.openSnackBarVotar(
              "Has votado correctamente",
              "Deshacer",
              4000,
              votable
            );
            this.votados++;
            votable.votado = true;
          },
          error: error => {
            console.error(error);
          }
        });
      } else {
        this.openSnackBar("Ya has alcanzado el máximo de votos", "", 2000);
      }
    }
  }
  openSnackBarVotar(
    message: string,
    action: string,
    time: number,
    votable: any
  ) {
    let ventana = this._snackBar.open(message, action, {
      duration: time
    });
    ventana.onAction().subscribe(() => {
      this.conexionService.desvotar(votable.id).subscribe({
        next: data => {
          this.openSnackBar("Eliminado el voto correctamente", "", 2000);
          votable.votado = false;
          this.votados--;
        },
        error: error => {
          console.error(error);
        }
      });
    });
  }
  openSnackBar(message: string, action: string, time: number) {
    this._snackBar.open(message, action, {
      duration: time
    });
  }
}
