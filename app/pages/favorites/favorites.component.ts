import { Component, OnInit, NgModule, ElementRef} from "@angular/core";
import { Database } from "../../providers/database/database";
import constants = require("../../common/constants");
import { GestureTypes, GestureEventData } from "ui/gestures";
import dialogs = require("ui/dialogs");
import { Page } from "ui/page";
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


  public name: string;
  public favorites: Array<any>;

  public constructor(private routerExtensions: RouterExtensions, private router: Router, private page: Page, private database: Database) {
    this.favorites = [];
  }

  public ngOnInit() {
    setTimeout(() => {
      this.fetch();
    }, 500);
  }

  public insert() {
    this.database.insert({name: this.name}).then(result => {
      this.fetch();
      this.name = "";
    });
  }

  public fetch() {
    this.database.fetch().then(result => {
      this.favorites = result;
    });
  }

  public onLongPress(args) {
    dialogs.confirm({
      title: "Delete from favorites",
      message: "Are you sure you want to delete " + args.object.get("text") + " from the list?",
      okButtonText: "Yes",
      cancelButtonText: "Cancel"
    }).then(result => {
      //console.log("Dialog result: " +result);
      if (result == true) {
        this.database.delete({name: args.object.get("text")}).then(result => {
          this.fetch();
        });
      }
    });
  }

  public onTap(args) {
    constants.searchCity = args.object.get("text");
    console.log(constants.searchCity);
    // set the firstVisit to be false
    constants.firstVisit = false;
    this.routerExtensions.navigate(["main"]);
  }
  
}
