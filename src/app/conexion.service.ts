import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ConexionService {
  private url = "https://votacion.testwebqd.ml/public/index.php";

  constructor(protected http: HttpClient) {}

  logout() {
    localStorage.clear();
  }
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  autenticarUsuario(usuario) {
    return this.http.post(this.url + "/auth", usuario, this.httpOptions);
  }

  registro(usuario) {
    return this.http.post(this.url + "/user", usuario, this.httpOptions);
  }

  desvotar(id) {
    let usuario = {
      username: localStorage.getItem("user"),
      pass: localStorage.getItem("pass")
    };
    return this.http.delete(
      this.url +
        "/votar/" +
        id +
        "/" +
        localStorage.getItem("user") +
        "/" +
        localStorage.getItem("pass"),
      this.httpOptions
    );
  }
  votar(id) {
    let usuario = {
      username: localStorage.getItem("user"),
      pass: localStorage.getItem("pass")
    };
    return this.http.post(this.url + "/votar/" + id, usuario, this.httpOptions);
  }

  votables() {
    return this.http.get(this.url + "/votable", this.httpOptions);
  }
  misVotos() {
    return this.http.get(
      this.url +
        "/votar/" +
        localStorage.getItem("user") +
        "/" +
        localStorage.getItem("pass"),
      this.httpOptions
    );
  }
}
