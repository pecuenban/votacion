import { Component, VERSION } from "@angular/core";
import { Plugins } from '@capacitor/core';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;

  myColor: "#ff0000";
}
