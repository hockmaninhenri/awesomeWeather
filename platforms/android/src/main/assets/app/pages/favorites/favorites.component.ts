import { Component, NgModule, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Database } from "../../providers/database/database";
import { Router } from "@angular/router";
import { routes } from "../../app.routing";
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: "favorites",
  templateUrl: "pages/favorites/favorites.html",
  styleUrls: ["pages/favorites/favorites-common.css", "pages/favorites/favorites.css"]
})
export class FavoritesComponent implements OnInit {

  public favorites: Array<any>;

  public constructor(private database: Database, private routerExtensions: RouterExtensions, private router: Router) {
    this.favorites = [];
  }

  public ngOnInit() {
    setTimeout(() => {
      this.fetch();
    }, 500);
  }

  public insert() {
    this.database.insert({name: "Vesa"}).then(result => {
      this.fetch();
    });
  }

  public fetch() {
    this.database.fetch().then(result => {
      this.favorites = result;
    });
  }

}
