import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  votados = 0;
  total = 5;
  votables = [
    {
      id: 1,
      votado: false,
      nombre: "test 1 asdfa jfasfasdhfasdhfasdfhasjdfhasdjfhasdfjfdh"
    },
    { id: 2, votado: false, nombre: "test 2" },
    { id: 3, votado: false, nombre: "test 3" },
    { id: 4, votado: false, nombre: "test 4" },
    { id: 5, votado: false, nombre: "test 5" },
    { id: 1, votado: false, nombre: "test 1" },
    { id: 2, votado: false, nombre: "test 2" },
    { id: 3, votado: false, nombre: "test 3" },
    { id: 4, votado: false, nombre: "test 4" },
    { id: 5, votado: false, nombre: "test 5" }
  ];
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {}
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
        this.openSnackBar("Has votado correctamente", "Deshacer");
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
