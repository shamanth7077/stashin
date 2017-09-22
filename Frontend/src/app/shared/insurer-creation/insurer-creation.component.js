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
var InsurerCreationComponent = (function () {
    function InsurerCreationComponent(StashService) {
        this.StashService = StashService;
        this.registered = false;
        this.name = '';
        this.COAF = this.StashService.getCOAF();
        this.launchSubscriptions();
        this.checkRegistered();
        this.user = '';
        this.ins = mock_input_1.MockInsurer.ins;
    }
    InsurerCreationComponent.prototype.launchSubscriptions = function () {
        var _this = this;
        this.StashService.coafObs.subscribe(function (res) {
            _this.COAF = res;
            _this.checkRegistered();
        });
    };
    InsurerCreationComponent.prototype.checkRegistered = function () {
        var _this = this;
        if (this.COAF) {
            this.StashService.getInsurer(this.COAF).subscribe(function (res) {
                if (res.name !== '') {
                    console.log("Node registered to: " + res.name);
                    _this.name = res.name;
                    _this.ins.name = res.name;
                    _this.ins.ampolicy = res.ampolicy;
                    _this.ins.housepolicy = res.housepolicy;
                    _this.ins.noofclients = res.numberOfClients;
                    _this.ins.housepremieum = res.housepremieum;
                    _this.ins.automobilepremieum = res.automobilepremieum;
                    _this.registered = true;
                    _this.user = 'insurer';
                }
            });
        }
    };
    return InsurerCreationComponent;
}());
InsurerCreationComponent = __decorate([
    core_1.Component({
        selector: 'insurer-creation',
        templateUrl: './insurer-creation.component.html',
        styleUrls: ['./insurer-creation.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService])
], InsurerCreationComponent);
exports.InsurerCreationComponent = InsurerCreationComponent;
//# sourceMappingURL=insurer-creation.component.js.map