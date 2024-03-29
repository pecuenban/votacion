import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatSliderModule } from "@angular/material/slider";
import { AppComponent } from "./app.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClientModule } from "@angular/common/http";

import { MatInputModule } from "@angular/material/input";

import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { GeneralComponent } from "./general/general.component";
import { ConexionService } from "./conexion.service";

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatRippleModule,
    MatSliderModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    RouterModule.forRoot([
    { path: "", component: LoginComponent },
    { path: "inicio", component: GeneralComponent }
], { relativeLinkResolution: 'legacy' })
  ],
  declarations: [AppComponent, GeneralComponent, LoginComponent],
  bootstrap: [AppComponent],
  providers: [ConexionService]
})
export class AppModule {}
