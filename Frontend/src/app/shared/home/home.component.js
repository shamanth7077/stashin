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
var router_1 = require("@angular/router");
var user_service_1 = require("../services/user.service");
var HomeComponent = (function () {
    function HomeComponent(Stashin, router, users) {
        var _this = this;
        this.Stashin = Stashin;
        this.router = router;
        this.users = users;
        this.ownerSelected = false;
        this.insurerSelected = false;
        this.stashinDeployed = false;
        this.ContractName = '';
        this.user = '' + this.users.getUser();
        this.users.userObs.subscribe(function (res) {
            _this.user = '' + res;
            _this.router.navigate(['/home']);
        }, function (err) { return console.log('Error fetching changed user'); });
        this.contractref = this.Stashin.getCOAF();
        this.launchSubscriptions();
    }
    HomeComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.Stashin.coafObs.subscribe(function (res) { return _this.contractref = res; });
    };
    HomeComponent.prototype.switchUser = function (action) {
        if (action == 'owner') {
            //console.log('owner')
            //this.users.setUser(3);
            //this.router.navigate(['/register/owner']);
            this.ownerSelected = true;
        }
        else if (action == 'insurer') {
            //this.users.setUser(5);
            //this.router.navigate(['action/insurer']);
            this.insurerSelected = true;
        }
    };
    HomeComponent.prototype.switchUserScreen = function (event) {
        if (event == 3) {
            this.users.setUser(3);
            this.router.navigate(['/register/owner']);
        }
        else if (event == 4) {
            this.users.setUser(4);
            this.router.navigate(['/register/owner']);
        }
        else if (event == 5) {
            this.users.setUser(5);
            this.router.navigate(['action/insurer']);
        }
        else if (event == 6) {
            this.users.setUser(6);
            this.router.navigate(['action/insurer']);
        }
    };
    HomeComponent.prototype.newContract = function () {
        this.stashinDeployed = false;
    };
    HomeComponent.prototype.deploy = function (contractref) {
        var _this = this;
        this.contractref = contractref;
        this.Stashin.deploycontract(contractref).subscribe(function (res) {
            console.info("contract with contract reference : " + contractref + "deployed");
            _this.ContractName = contractref;
            _this.stashinDeployed = true;
        }, function (err) {
            alert("could not deploy. An error occured. check console.");
            console.log(err);
        });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService, router_1.Router, user_service_1.UserService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map