"use strict";
var nativescript_geolocation_1 = require("nativescript-geolocation");
var constants = require("../../common/constants");
var utilities = require("../../common/utilities");
var locationStore = require('../../stores/location');
var application = require("application");
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
        // "cache" OnInit "this"
        var that = this;
        var locationFound = false;
        // get the location based weather only when opening the app
        if (constants.firstVisit) {
            alert("First visit");
            isLocationEnabled();
            if (locationFound) {
                getLocationNow();
            }
            else
                alert("Location services down");
            // get time of day
            var time_of_day = utilities.getTimeOfDay();
            // load location from locationStore
            var location = locationStore.getLocation();
            // set weather icons
            this.setIcons();
            // set the firstVisit to be false
            constants.firstVisit = false;
        }
        function isLocationEnabled() {
            // Check if location services are enabled
            var isEnabledProperty = nativescript_geolocation_1.isEnabled();
            if (isEnabledProperty) {
                locationFound = true;
            }
        }
        function getLocationNow() {
            // get current location
            nativescript_geolocation_1.getCurrentLocation({ timeout: 10000 })
                .then(function (loc) {
                if (loc) {
                    console.log("Current location: " + loc);
                    locationStore.saveLocation(loc);
                    // Construct the API url with key and 'loc'
                    var url = '';
                    // Resolve the result
                    var weather = "clouds"; // THIS MUST GET CURRENT WEATHER DESC FROM API
                    // Set the correct data to screen
                    var icon = constants.WEATHER_ICONS[time_of_day][weather];
                    that.set('icon', String.fromCharCode(icon));
                    that.set('curCity', "Lat: " + loc.latitude + ", Long: " + loc.longitude); // HERE MUST GET CITY NAME
                    that.set('curTemp', '-4'); // HERE MUST GET DEGREES FROM API
                    that.set('curWind', 'tornado'); // HERE MUST GET WIND
                    that.set('curHumid', 'moist'); // HERE MUST GET HUMIDITY
                    that.set('curWeath', weather);
                }
            }, function (e) {
                console.log("Location error received: " + e);
                alert("Location error received: " + e);
            });
        }
        function pageLoaded(args) {
            exports.pageLoaded = pageLoaded;
        }
        // When the application is about to close, set the 'firstVisit' value to true,
        // to get the location based weather forecast on startup
        application.on(application.exitEvent, function (args) {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                constants.firstVisit = true;
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                constants.firstVisit = true;
                console.log("First visit: " + constants.firstVisit);
            }
        });
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