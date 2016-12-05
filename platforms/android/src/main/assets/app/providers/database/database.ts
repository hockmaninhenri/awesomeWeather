import { Injectable } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

@Injectable()
export class Database {

  private db: any;
  private isInstantiated: boolean;

  public constructor() {
    if(!this.isInstantiated) {
      (new Sqlite("app.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS favorites(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)").then(result => {
          this.db = db;
          this.isInstantiated = true;
        }, error => {
          console.log("CREATE TABLE ERROR : ", error);
        });
      }, error => {
        console.log("OPEN DB ERROR: ", error);
      });
    }
  }

  public insert(data: any): Promise<any> {
    return this.db
      .execSQL("INSERT INTO favorites (name) VALUES (?)", [data.name]);
  }

  public fetch(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM favorites").then(rows => {
        let favorites = [];
        for (let row in rows) {
          favorites.push({
            "id": rows[row][0],
            "name": rows[row][1]
          });
        }
        resolve(favorites);
      }, error => {
        reject(error);
      });
    });
  }

  public delete(data: any): Promise<any> {
    return this.db
    .execSQL("DELETE FROM favorites WHERE id = (?)", [data.id]);
  }

}
