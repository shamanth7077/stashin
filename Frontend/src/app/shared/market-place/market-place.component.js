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
var MarketPlaceComponent = (function () {
    function MarketPlaceComponent(StashService) {
        this.StashService = StashService;
        this.COAF = this.StashService.getCOAF();
        this.assetid = null;
        this.assetforsaleid = null;
        this.node = null;
        this.node2 = null;
        this.launchSubscriptions();
        this.users = [];
        this.user = 'view';
    }
    MarketPlaceComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StashService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.getUsers();
        });
    };
    MarketPlaceComponent.prototype.getUsers = function () {
        var _this = this;
        if (this.COAF) {
            alert("entered here");
            this.StashService.getassetsforsale(this.COAF)
                .subscribe(function (res) {
                _this.users = res.assets;
                console.log(res);
            }, function (err) { return console.log(err); });
        }
    };
    MarketPlaceComponent.prototype.switchscreens = function (user) {
        this.assetforsaleid = user.id;
        this.user = 'sale';
    };
    MarketPlaceComponent.prototype.return = function () {
        this.user = 'view';
    };
    MarketPlaceComponent.prototype.RecordSale = function () {
        this.StashService.record_sale(this.assetforsaleid, this.assetid, this.node, this.node2, this.COAF)
            .subscribe(function (res) {
            console.log(res);
        }, function (err) { return console.log(err); });
        this.user = 'view';
    };
    MarketPlaceComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    return MarketPlaceComponent;
}());
MarketPlaceComponent = __decorate([
    core_1.Component({
        selector: 'market-place',
        templateUrl: './market-place.component.html',
        styleUrls: ['./market-place.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService])
], MarketPlaceComponent);
exports.MarketPlaceComponent = MarketPlaceComponent;
//# sourceMappingURL=market-place.component.js.map