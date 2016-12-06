"use strict";
var core_1 = require("@angular/core");
var database_1 = require("../../providers/database/database");
var FavoritesComponent = (function () {
    function FavoritesComponent(database) {
        this.database = database;
        this.favorites = [];
    }
    FavoritesComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.fetch();
        }, 500);
    };
    FavoritesComponent.prototype.insert = function () {
        var _this = this;
        this.database.insert({ name: this.name }).then(function (result) {
            _this.fetch();
        });
    };
    FavoritesComponent.prototype.fetch = function () {
        var _this = this;
        this.database.fetch().then(function (result) {
            _this.favorites = result;
        });
    };
    FavoritesComponent.prototype.delete = function () {
        var _this = this;
        this.database.delete({ id: 1 }).then(function (result) {
            _this.fetch();
        });
        //console.log();
    };
    FavoritesComponent.prototype.onLongPress = function (args) {
        console.log(args.object);
        console.log("onLongPress id: " + args.object.get("id"));
    };
    FavoritesComponent = __decorate([
        core_1.Component({
            selector: "favorites",
            templateUrl: "pages/favorites/favorites.html",
            styleUrls: ["pages/favorites/favorites-common.css", "pages/favorites/favorites.css"]
        }), 
        __metadata('design:paramtypes', [database_1.Database])
    ], FavoritesComponent);
    return FavoritesComponent;
}());
exports.FavoritesComponent = FavoritesComponent;
//# sourceMappingURL=favorites.component.js.map