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
var AssetCreationComponent = (function () {
    function AssetCreationComponent(StashService) {
        this.StashService = StashService;
        this.hasAssets = false;
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.users = [];
    }
    AssetCreationComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StashService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.getUsers();
        });
    };
    AssetCreationComponent.prototype.getUsers = function () {
        var _this = this;
        if (this.COAF) {
            this.StashService.getassets(this.COAF)
                .subscribe(function (res) {
                _this.users = res.assets;
                if (res.assets.length > 0) {
                    _this.hasAssets = true;
                }
                console.log(res);
            }, function (err) { return console.log(err); });
        }
    };
    AssetCreationComponent.prototype.showform = function (value) {
        if (value == true) {
            this.hasAssets = false;
        }
        else {
            this.hasAssets = true;
        }
    };
    AssetCreationComponent.prototype.refresh = function () {
        this.getUsers();
    };
    AssetCreationComponent.prototype.ngOnInit = function () {
        if (this.COAF) {
            this.getUsers();
        }
    };
    return AssetCreationComponent;
}());
AssetCreationComponent = __decorate([
    core_1.Component({
        selector: 'asset-creation',
        templateUrl: './asset-creation.component.html',
        styleUrls: ['./asset-creation.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService])
], AssetCreationComponent);
exports.AssetCreationComponent = AssetCreationComponent;
//# sourceMappingURL=asset-creation.component.js.map