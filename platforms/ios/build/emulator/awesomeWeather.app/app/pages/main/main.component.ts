import geolocation = require("location");
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import textViewModule = require("ui/text-view");
import observable = require("data/observable");

@Component({
  selector: "my-app",
  templateUrl: "pages/main/main.html",
  styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private page: Page) {

  }
  ngOnInit() {
    this.page.actionBarHidden = true;

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
  }
}
