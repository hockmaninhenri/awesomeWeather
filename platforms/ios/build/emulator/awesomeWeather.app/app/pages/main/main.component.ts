import geolocation = require("location");
import { View } from "ui/core/view";
import { Page } from "ui/page";
import { Router } from "@angular/router";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "pages/main/main.html",
  styleUrls: ["pages/main/main-common.css", "pages/main/main.css"]
})
export class MainComponent implements OnInit {
  constructor(private router: Router, private page: Page) {

  }
  ngOnInit() {
    //this.page.actionBarHidden = true;
  }
}
