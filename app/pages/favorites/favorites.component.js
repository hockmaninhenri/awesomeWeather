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
    FavoritesComponent.prototype.onLongPress = function (args) {
        var _this = this;
        //console.log(args.object.get("text"));
        this.database.delete({ name: args.object.get("text") }).then(function (result) {
            _this.fetch();
        });
    };
    FavoritesComponent.prototype.onItemTap = function (args) {
        console.log("clicked " + args.index);
        /*var num = args.index;
        this.database.delete({id: 'num'}).then(result => {
          this.fetch();
        });*/
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