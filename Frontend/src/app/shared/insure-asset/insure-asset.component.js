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
var mock_input_1 = require("../data/mock_input");
var stashin_service_1 = require("../services/stashin.service");
var asset_class_1 = require("../models/asset.class");
var core_1 = require("@angular/core");
var InsureAssetComponent = (function () {
    function InsureAssetComponent(StashService) {
        this.StashService = StashService;
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.checkRegistered();
        this.users = [];
        this.ins = mock_input_1.MockInsurer.ins;
        alert("done");
    }
    InsureAssetComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StashService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.checkRegistered();
        });
    };
    InsureAssetComponent.prototype.create = function (COAF) {
        var _this = this;
        this.StashService.insure_asset(this.ass, this.ins, node, this.COAF)
            .subscribe(function () {
            alert('Successfully added owner to the Stashin contract');
            _this.clearInput();
            //_this.router.navigate(['/home']);
            _this.StashService.refresh();
        }, function (err) { return alert('Error adding owner to the Stashin contract'); });
    };
    return InsureAssetComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", asset_class_1.Asset)
], InsureAssetComponent.prototype, "ass", void 0);
InsureAssetComponent = __decorate([
    core_1.Component({
        selector: 'insure-asset',
        templateUrl: './insure-asset.component.html',
        styleUrls: ['./insure-asset.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService])
], InsureAssetComponent);
exports.InsureAssetComponent = InsureAssetComponent;
//# sourceMappingURL=insure-asset.component.js.map
