"use strict";
var core_1 = require("@angular/core");
var database_1 = require("../../providers/database/database");
var constants = require("../../common/constants");
var dialogs = require("ui/dialogs");
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
            _this.name = "";
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
        dialogs.confirm({
            title: "Delete from favorites",
            message: "Are you sure you want to delete " + args.object.get("text") + " from the list?",
            okButtonText: "Yes",
            cancelButtonText: "Cancel"
        }).then(function (result) {
            //console.log("Dialog result: " +result);
            if (result == true) {
                _this.database.delete({ name: args.object.get("text") }).then(function (result) {
                    _this.fetch();
                });
            }
        });
    };
    FavoritesComponent.prototype.onTap = function (args) {
        constants.searchCity = args.object.get("text");
        console.log(constants.searchCity);
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