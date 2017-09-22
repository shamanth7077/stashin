"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var mydatepicker_1 = require("mydatepicker");
var app_component_1 = require("./app.component");
var home_component_1 = require("./shared/home/home.component");
var url_service_1 = require("./shared/services/url.service");
var stashin_service_1 = require("./shared/services/stashin.service");
var user_service_1 = require("./shared/services/user.service");
var app_routes_1 = require("./app.routes");
var primeng_1 = require("primeng/primeng");
var animations_1 = require("@angular/platform-browser/animations");
var navbar_component_1 = require("./shared/navbar/navbar.component");
var owner_creation_component_1 = require("./shared/owner-creation/owner-creation.component");
var asset_creation_component_1 = require("./shared/asset-creation/asset-creation.component");
var user_list_component_1 = require("./shared/user-list/user-list.component");
var user_form_component_1 = require("./shared/user-form/user-form.component");
var search_component_1 = require("./shared/search/search.component");
var insurer_creation_component_1 = require("./shared/insurer-creation/insurer-creation.component");
var market_place_component_1 = require("./shared/market-place/market-place.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
            app_routes_1.AppRoutingModule,
            mydatepicker_1.MyDatePickerModule,
            primeng_1.CalendarModule,
            animations_1.BrowserAnimationsModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            home_component_1.HomeComponent,
            navbar_component_1.NavbarComponent,
            user_form_component_1.UserFormComponent,
            asset_creation_component_1.AssetCreationComponent,
            owner_creation_component_1.OwnerRegisterComponent,
            user_list_component_1.UserListComponent,
            search_component_1.SearchComponent,
            insurer_creation_component_1.InsurerCreationComponent,
            market_place_component_1.MarketPlaceComponent
        ],
        providers: [
            url_service_1.UrlService,
            user_service_1.UserService,
            stashin_service_1.StashinService,
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map