import { Component, OnInit, NgModule, ElementRef} from "@angular/core";
import { Database } from "../../providers/database/database";
import { GestureTypes, GestureEventData } from "ui/gestures";

@Component({
  selector: "favorites",
  templateUrl: "pages/favorites/favorites.html",
  styleUrls: ["pages/favorites/favorites-common.css", "pages/favorites/favorites.css"]
})
export class FavoritesComponent implements OnInit {


  public name: string;
  public favorites: Array<any>;



  public constructor(private database: Database) {
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
    });
  }

  public fetch() {
    this.database.fetch().then(result => {
      this.favorites = result;
    });
  }


  public onLongPress(args) {
    //console.log(args.object.get("text"));
    this.database.delete({name: args.object.get("text")}).then(result => {
      this.fetch();
    });
  }


}
