"use strict";
var nativescript_geolocation_1 = require("nativescript-geolocation");
var constants = require("../../common/constants");
var requestor = require("../../common/requestor");
var utilities = require("../../common/utilities");
var locationStore = require('../../stores/location');
var application = require("application");
var database_1 = require("../../providers/database/database");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var router_2 = require("nativescript-angular/router");
var dialogs = require("ui/dialogs");
//import { GestureTypes, SwipeGestureEventData } from "ui/gestures";
var observable = require("data/observable");
var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(routerExtensions, router, page, database) {
        _super.call(this);
        this.routerExtensions = routerExtensions;
        this.router = router;
        this.page = page;
        this.database = database;
        // Enable location services
        nativescript_geolocation_1.enableLocationRequest(true);
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
        // get time of day
        var time_of_day = utilities.getTimeOfDay();
        // get the location based weather only when opening the app
        if (constants.firstVisit) {
            isLocationEnabled();
            if (locationFound) {
                getLocationNow();
            }
            else
                alert("Location services down");
            // load location from locationStore
            var location = locationStore.getLocation();
            // set weather icons
            this.setIcons();
        }
        else if (constants.searchCity) {
            // get clicked favorite to keyword for API call
            var keyword = utilities.replaceUmlauts(constants.searchCity);
            // Construct the API url with key and 'loc'
            var url = "" + constants.WEATHER_URL + constants.CURRENT_WEATHER_PATH + "?q=" + keyword + "&apikey=" + constants.WEATHER_APIKEY;
            // Resolve the result
            requestor.get(url).then(function (res) {
                var weather = res.weather[0].main.toLowerCase();
                var weather_description = res.weather[0].description;
                var temperature = res.main.temp;
                var icon = constants.WEATHER_ICONS[time_of_day][weather];
                // Set the correct data to screen
                that.set('icon', String.fromCharCode(icon));
                that.set('curWeath', weather_description);
                that.set('curDesc', "" + utilities.describeTemperature(Math.floor(temperature)));
                that.set('curCity', res.name);
                that.set('curTemp', "" + utilities.convertKelvinToCelsius(temperature).toFixed(2));
                that.set('curWind', "" + utilities.describeWindSpeed(Math.floor(res.wind.speed)));
                that.set('curHumid', "" + utilities.describeHumidity(Math.floor(res.main.humidity)));
            });
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
            nativescript_geolocation_1.getCurrentLocation({ timeout: 30000 })
                .then(function (loc) {
                if (loc) {
                    //console.log("Current location: " + loc);
                    locationStore.saveLocation(loc);
                    // Construct the API url with key and 'loc'
                    var url = "" + constants.WEATHER_URL + constants.CURRENT_WEATHER_PATH + "?lat=" + loc.latitude + "&lon=" + loc.longitude + "&apikey=" + constants.WEATHER_APIKEY;
                    // Resolve the result
                    requestor.get(url).then(function (res) {
                        var weather = res.weather[0].main.toLowerCase();
                        var weather_description = res.weather[0].description;
                        var temperature = res.main.temp;
                        var icon = constants.WEATHER_ICONS[time_of_day][weather];
                        // Set the correct data to screen
                        that.set('icon', String.fromCharCode(icon));
                        that.set('curWeath', weather_description);
                        that.set('curDesc', "" + utilities.describeTemperature(Math.floor(temperature)));
                        that.set('curCity', res.name);
                        that.set('curTemp', "" + utilities.convertKelvinToCelsius(temperature).toFixed(2));
                        that.set('curWind', "" + utilities.describeWindSpeed(Math.floor(res.wind.speed)));
                        that.set('curHumid', "" + utilities.describeHumidity(Math.floor(res.main.humidity)));
                    });
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
        if (this.curCity === "") {
            dialogs.alert("Location not found!");
        }
        else {
            this.database.insert({ name: this.curCity });
        }
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "pages/main/main.html",
            styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
        }), 
        __metadata('design:paramtypes', [router_2.RouterExtensions, router_1.Router, page_1.Page, database_1.Database])
    ], MainComponent);
    return MainComponent;
}(observable.Observable));
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map