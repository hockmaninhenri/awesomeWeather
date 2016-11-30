"use strict";
var nativescript_geolocation_1 = require("nativescript-geolocation");
var constants = require("../../common/constants");
var utilities = require("../../common/utilities");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var router_2 = require("nativescript-angular/router");
//import { GestureTypes, SwipeGestureEventData } from "ui/gestures";
var observable = require("data/observable");
var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(routerExtensions, router, page) {
        _super.call(this);
        this.routerExtensions = routerExtensions;
        this.router = router;
        this.page = page;
        // >> Enable location services
        nativescript_geolocation_1.enableLocationRequest(true);
        // << Enable location services
        // >> This set contains code for swipe event to change the page.
        // >> Didn't work somewhy, so changed to button-events
        /*
        "cache" constructor "this"
        var that = this;
    
        // Detecting swipe gestures on page, and routing to favorites if swipe right  THIS NEEDS ATTENTION, DOESN'T WORK YET
        this.page.on(GestureTypes.swipe, function(args: SwipeGestureEventData) {
            console.log("Swipe Direction From event function: " + args.direction);
    
            that.onSwipe();
        });
        */
        // << Swipe page change
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
        isLocationEnabled();
        getLocationNow();
        // get time of day
        var time_of_day = utilities.getTimeOfDay();
        // set weather icons
        this.setIcons();
        var weather = "clouds"; // THIS MUST GET CURRENT WEATHER DESC FROM API
        var icon = constants.WEATHER_ICONS[time_of_day][weather];
        this.set('icon', String.fromCharCode(icon));
        this.set('curTemp', '-4'); // HERE MUST GET DEGREES FROM API
        this.set('curWind', 'tornado'); // HERE MUST GET WIND
        this.set('curHumid', 'moist'); // HERE MUST GET HUMIDITY
        this.set('curWeath', weather);
        function isLocationEnabled() {
            // Check if location services are enabled
            var isEnabledProperty = nativescript_geolocation_1.isEnabled();
            var message = "Location services down";
            if (isEnabledProperty) {
                message = "Location works";
            }
            alert(message);
        }
        function getLocationNow() {
            // get current location
            nativescript_geolocation_1.getCurrentLocation({ timeout: 10000 })
                .then(function (location) {
                console.log("Location received: " + location);
                alert(location);
            }).catch(function (error) {
                console.log("Location error received: " + error);
                alert("Location error received: " + error);
            });
        }
        function pageLoaded(args) {
            exports.pageLoaded = pageLoaded;
        }
    };
    MainComponent.prototype.goFavorites = function () {
        this.routerExtensions.navigate(["favorites"]);
    };
    MainComponent.prototype.addFavorite = function () {
        // add favorite
        return;
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