"use strict";
var core_1 = require("@angular/core");
var Sqlite = require("nativescript-sqlite");
var Database = (function () {
    function Database() {
        var _this = this;
        if (!this.isInstantiated) {
            (new Sqlite("app.db")).then(function (db) {
                db.execSQL("CREATE TABLE IF NOT EXISTS favorites(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)").then(function (result) {
                    _this.db = db;
                    _this.isInstantiated = true;
                }, function (error) {
                    console.log("CREATE TABLE ERROR : ", error);
                });
            }, function (error) {
                console.log("OPEN DB ERROR: ", error);
            });
        }
    }
    Database.prototype.insert = function (data) {
        return this.db
            .execSQL("INSERT INTO favorites (name) VALUES (?)", [data.name]);
    };
    Database.prototype.fetch = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.all("SELECT * FROM favorites").then(function (rows) {
                var favorites = [];
                for (var row in rows) {
                    favorites.push({
                        "id": rows[row][0],
                        "name": rows[row][1]
                    });
                }
                resolve(favorites);
            }, function (error) {
                reject(error);
            });
        });
    };
    Database.prototype.delete = function () {
        return this.db
            .execSQL("DELETE FROM favorites WHERE id = ?");
    };
    Database = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Database);
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=database.js.map