"use strict";
var constants = require("../../common/constants");
var utilities = require("../../common/utilities");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var router_2 = require("nativescript-angular/router");
var gestures_1 = require("ui/gestures");
var observable = require("data/observable");
var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(routerExtensions, router, page) {
        _super.call(this);
        this.routerExtensions = routerExtensions;
        this.router = router;
        this.page = page;
    }
    MainComponent.prototype.setIcons = function () {
        var _this = this;
        var icons = utilities.getIcons([
            'temperature', 'wind', 'cloud',
            'pressure', 'humidity', 'rain',
            'sunrise', 'sunset'
        ]);
        icons.forEach(function (item) {
            _this.set(item.name + "_icon", item.icon);
        });
    };
    MainComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        // check the geolocation
        /*
        if (!geolocation.isEnabled()) {
          geolocation.enableLocationRequest(); // try to enable geolocation
        }
        */
        // get time of day
        var time_of_day = utilities.getTimeOfDay();
        this.setIcons();
        // try to get the location, alert if not success
        /*
        var location = geolocation.getCurrentLocation({timeout: 10000}).
          then(
            (loc) => {
              if (loc) {
                // save the location
                locationStore.saveLocation(loc);
              }
            },
            (e) => {
              // failed to get location
              alert(e.message);
            }
        );
        */
        var weather = "clouds"; // THIS MUST GET CURRENT WEATHER DESC FROM API
        var icon = constants.WEATHER_ICONS[time_of_day][weather];
        this.set('icon', String.fromCharCode(icon));
        this.set('curTemp', '-4'); // HERE MUST GET DEGREES FROM API
        this.set('curWeath', weather);
        function pageLoaded(args) {
            var page = page.getViewById("wrap");
            // Detecting swipe gestures on page, and routing to favorites if swipe right  THIS NEEDS ATTENTION, DOESN'T WORK YET
            var observer = page.on(gestures_1.GestureTypes.swipe, function (args) {
                console.log("Swipe Direction: " + args.direction);
                if (args.direction == 1) {
                    this.routerExtensions.navigate(["favorites"]);
                }
            });
        }
        exports.pageLoaded = pageLoaded;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "pages/main/main.html",
            styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
        }), 
        __metadata('design:paramtypes', [router_2.RouterExtensions, router_1.Router, page_1.Page])
    ], MainComponent);
    return MainComponent;
}(observable.Observable));
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map