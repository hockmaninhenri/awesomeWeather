import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
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
//import { GestureTypes, SwipeGestureEventData } from "ui/gestures";

import observable = require("data/observable");

@Component({
  selector: "my-app",
  templateUrl: "pages/main/main.html",
  styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
})
export class MainComponent extends observable.Observable implements OnInit {
  constructor(private routerExtensions: RouterExtensions, private router: Router, private page: Page) {
    super();

    // >> Enable location services
    enableLocationRequest(true);
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

    // "cache" OnInit "this"
    var that = this;

    isLocationEnabled();
    getLocationNow();

    // get time of day
    var time_of_day = utilities.getTimeOfDay();

    // load location from locationStore
    var location = locationStore.getLocation();

    // set weather icons
    this.setIcons();

    function isLocationEnabled() {
      // Check if location services are enabled
      let isEnabledProperty = isEnabled();

      let message = "Location services down";
      if (isEnabledProperty) {
        message = "Location works";
      }
      //alert(message);
    }

    function getLocationNow() {
      // get current location
      getCurrentLocation({ timeout: 10000 })
        .then(function(loc) {
          if (loc) {
            console.log("Current location: " + loc);
            locationStore.saveLocation(loc);

            var url = ''; // HERE CONTRUCT THE API URL WITH KEY AND 'loc'

            var weather = "clouds"; // THIS MUST GET CURRENT WEATHER DESC FROM API

            var icon = constants.WEATHER_ICONS[time_of_day][weather];
            that.set('icon', String.fromCharCode(icon));
            that.set('curCity', "Lat: " + loc.latitude + ", Long: " + loc.longitude); // HERE MUST CITY NAME
            that.set('curTemp', '-4'); // HERE MUST GET DEGREES FROM API
            that.set('curWind', 'tornado'); // HERE MUST GET WIND
            that.set('curHumid', 'moist'); // HERE MUST GET HUMIDITY
            that.set('curWeath', weather);

          }
        }, function(e) {
            console.log("Location error received: " + e);
            alert("Location error received: " + e);
        });
    }

    function pageLoaded(args) {
      exports.pageLoaded = pageLoaded;
    }

  }

  public goFavorites() {
    this.routerExtensions.navigate(["favorites"]);
  }

  public addFavorite() {
    // add favorite
    return;
  }
}
