import geolocation = require("nativescript-geolocation");
import constants = require("../../common/constants");
import utilities = require("../../common/utilities");
import locationStore = require('../../stores/location');
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { routes } from "../../app.routing";
import { Component, NgModule, ElementRef, OnInit, ViewChild } from "@angular/core";
import { platformNativeScriptDynamic, NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import gestures = require("ui/gestures");
import textViewModule = require("ui/text-view");
import observable = require("data/observable");

@Component({
  selector: "my-app",
  templateUrl: "pages/main/main.html",
  styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
})
export class MainComponent extends observable.Observable implements OnInit {
  constructor(private routerExtensions: RouterExtensions, private router: Router, private page: Page) {
    super();

    // check the geolocation
    if (!geolocation.isEnabled()) {
      geolocation.enableLocationRequest(); // try to enable geolocation
    }

    // get time of day
    var time_of_day = utilities.getTimeOfDay();
    this.setIcons();

    // try to get the location, alert if not success
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

    var weather = "clouds"; // THIS MUST GET CURRENT WEATHER DESC FROM API

    var icon = constants.WEATHER_ICONS[time_of_day][weather];
    this.set('icon', String.fromCharCode(icon));
    this.set('curTemp', '-4'); // HERE MUST GET DEGREES FROM API
    this.set('curWeath', weather);



  }

  setIcons() {
    var icons = utilities.getIcons([
      'temperature', 'wind', 'cloud',
      'pressure', 'humidity', 'rain',
      'sunrise', 'sunset'
    ]);
    icons.forEach((item) => {
      this.set(`${item.name}_icon`, item.icon);
    });
  }

  ngOnInit() {
    this.page.actionBarHidden = true;

    function pageLoaded(args) {
      // Detecting swipe gestures on page, and routing to favorites if swipe right
      var page = args.object;

      var observer = page.on("swipe", function (args: gestures.SwipeGestureEventData) {
        console.log("Swipe direction: " + args.direction);
        /*if (args.direction == right) {
          this.routerExtensions.navigate(["/favorites"]);
        }*/
      });
    }
    exports.pageLoaded = pageLoaded;
  }
}
