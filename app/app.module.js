"use strict";
var core_1 = require("@angular/core");
var platform_1 = require("nativescript-angular/platform");
var app_component_1 = require("./app.component");
<<<<<<< Updated upstream
=======
var app_routing_1 = require("./app.routing");
var database_1 = require("./providers/database/database");
>>>>>>> Stashed changes
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
<<<<<<< Updated upstream
            imports: [platform_1.NativeScriptModule]
=======
            providers: [database_1.Database]
>>>>>>> Stashed changes
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map