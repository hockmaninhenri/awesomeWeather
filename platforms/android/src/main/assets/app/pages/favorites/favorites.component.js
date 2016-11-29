"use strict";
var core_1 = require("@angular/core");
var database_1 = require("../../providers/database/database");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var FavoritesComponent = (function () {
    function FavoritesComponent(database, routerExtensions, router) {
        this.database = database;
        this.routerExtensions = routerExtensions;
        this.router = router;
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
        this.database.insert({ name: "Vesa" }).then(function (result) {
            _this.fetch();
        });
    };
    FavoritesComponent.prototype.fetch = function () {
        var _this = this;
        this.database.fetch().then(function (result) {
            _this.favorites = result;
        });
    };
    FavoritesComponent = __decorate([
        core_1.Component({
            selector: "favorites",
            templateUrl: "pages/favorites/favorites.html",
            styleUrls: ["pages/favorites/favorites-common.css", "pages/favorites/favorites.css"]
        }), 
        __metadata('design:paramtypes', [database_1.Database, router_2.RouterExtensions, router_1.Router])
    ], FavoritesComponent);
    return FavoritesComponent;
}());
exports.FavoritesComponent = FavoritesComponent;
//# sourceMappingURL=favorites.component.js.map