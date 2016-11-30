"use strict";
var main_component_1 = require("./pages/main/main.component");
var favorites_component_1 = require("./pages/favorites/favorites.component");
exports.routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main", component: main_component_1.MainComponent },
    { path: "favorites", component: favorites_component_1.FavoritesComponent }
];
exports.navigatableComponents = [
    main_component_1.MainComponent,
    favorites_component_1.FavoritesComponent
];
//# sourceMappingURL=app.routing.js.map