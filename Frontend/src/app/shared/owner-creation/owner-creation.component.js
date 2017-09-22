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
var mock_input_1 = require("../data/mock_input");
var stashin_service_1 = require("../services/stashin.service");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var OwnerRegisterComponent = (function () {
    function OwnerRegisterComponent(StashService, users, router) {
        var _this = this;
        this.StashService = StashService;
        this.users = users;
        this.router = router;
        this.registered = false;
        this.name = '';
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.checkRegistered();
        this.user = '';
        this.own = mock_input_1.MockOwner.own;
        //this.users.setUser(3);
        this.users.userObs.subscribe(function (res) {
            _this.registered = false;
            _this.COAF = _this.StashService.getCOAF();
            console.log(_this.COAF);
            _this.user = '';
            _this.own = mock_input_1.MockOwner.own;
            _this.launchSubscriptions();
        }, function (err) { return console.log('Error fetching changed user'); });
    }
    OwnerRegisterComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StashService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.checkRegistered();
        });
    };
    OwnerRegisterComponent.prototype.checkRegistered = function () {
        var _this = this;
        if (this.COAF) {
            this.StashService.getMe(this.COAF).subscribe(function (res) {
                if (res.name !== '') {
                    console.log("Node registered to: " + res.name);
                    _this.name = res.name;
                    _this.own.name = res.name;
                    _this.own.age = res.age;
                    _this.own.address = res.address;
                    _this.own.contactnumber = res.contactnumber;
                    _this.own.SSN = res.SSN;
                    _this.own.status = res.status;
                    _this.own.noofassets = res.numberOfAssets;
                    _this.registered = true;
                    _this.user = 'owner';
                }
            });
        }
    };
    return OwnerRegisterComponent;
}());
OwnerRegisterComponent = __decorate([
    core_1.Component({
        selector: 'owner-creation',
        templateUrl: './owner-creation.component.html',
        styleUrls: ['./owner-creation.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService, user_service_1.UserService, router_1.Router])
], OwnerRegisterComponent);
exports.OwnerRegisterComponent = OwnerRegisterComponent;
//# sourceMappingURL=owner-creation.component.js.map