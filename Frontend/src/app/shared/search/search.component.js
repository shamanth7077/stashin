"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var stashin_service_1 = require("../services/stashin.service");
var user_service_1 = require("../services/user.service");
var SearchComponent = (function () {
    function SearchComponent(StashService, userService) {
        var _this = this;
        this.StashService = StashService;
        this.userService = userService;
        this.coaf = new core_1.EventEmitter();
        this.user = this.userService.getUser();
        this.userService.userObs.subscribe(function (res) { return _this.user = res; });
    }
    SearchComponent.prototype.getcontract = function (coaf) {
        //    this.StashService.getContractInfo(coaf)
        //      .subscribe(res => {
        this.coaf.emit(coaf);
        this.StashService.setCOAF(coaf);
        //        },
        //      err => {
        //        alert('No contract with that reference found.');
        //      console.log(err);
        //});
    };
    return SearchComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchComponent.prototype, "coaf", void 0);
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService,
        user_service_1.UserService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map