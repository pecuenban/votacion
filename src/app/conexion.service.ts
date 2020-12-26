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

  votables() {
    return this.http.get(this.url + "/votable", this.httpOptions);
  }
}