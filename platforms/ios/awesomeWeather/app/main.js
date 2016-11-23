"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var status_bar_util_1 = require("./common/status-bar-util");
var platform = platform_1.platformNativeScriptDynamic();
status_bar_util_1.setStatusBarColors();
platform.bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map