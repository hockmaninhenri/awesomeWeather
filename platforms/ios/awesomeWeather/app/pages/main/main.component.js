"use strict";
var geolocation = require("nativescript-geolocation");
var constants = require("../../common/constants");
var utilities = require("../../common/utilities");
var locationStore = require('../../stores/location');
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var textViewModule = require("ui/text-view");
var observable = require("data/observable");
var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(router, page) {
        _super.call(this);
        this.router = router;
        this.page = page;
        // check the geolocation
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest(); // try to enable geolocation
        }
        // get time of day
        var time_of_day = utilities.getTimeOfDay();
        this.setIcons();
        // try to get the location, alert if not success
        var location = geolocation.getCurrentLocation({ timeout: 10000 }).
            then(function (loc) {
            if (loc) {
                // save the location
                locationStore.saveLocation(loc);
            }
        }, function (e) {
            // failed to get location
            alert(e.message);
        });
        var weather = "clouds";
        var icon = constants.WEATHER_ICONS[time_of_day][weather];
        this.set('icon', String.fromCharCode(icon));
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
        //this.page.actionBarHidden = true;
        function pageLoaded(args) {
            var page = args.object;
            var obj = new observable.Observable();
            obj.set("someProperty", "Please change this text!");
            page.bindingContext = obj;
        }
        exports.pageLoaded = pageLoaded;
        var textView = new textViewModule.TextView();
        textView.text = "I'ts damn cold outside";
        textView.editable = false;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "pages/main/main.html",
            styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
        }), 
        __metadata('design:paramtypes', [router_1.Router, page_1.Page])
    ], MainComponent);
    return MainComponent;
}(observable.Observable));
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map