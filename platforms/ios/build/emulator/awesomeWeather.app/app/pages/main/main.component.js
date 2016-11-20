"use strict";
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var textViewModule = require("ui/text-view");
var observable = require("data/observable");
var MainComponent = (function () {
    function MainComponent(router, page) {
        this.router = router;
        this.page = page;
    }
    MainComponent.prototype.ngOnInit = function () {
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
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map