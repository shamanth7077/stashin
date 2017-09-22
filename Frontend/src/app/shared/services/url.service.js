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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/do");
var user_service_1 = require("./user.service");
var UrlService = (function () {
    function UrlService(userService) {
        var _this = this;
        this.userService = userService;
        this.url = 'http://localhost:8000';
        this.deploy = this.url + '/api/0/deploy_sol';
        this.node = +this.userService.getUser();
        if (this.node == 5) {
            this.node = 0;
        }
        if (this.node == 6) {
            this.node = 1;
        }
        this.userService.userObs.subscribe(function (user) {
            _this.node = +user;
            if (_this.node == 5) {
                _this.node = 0;
            }
            if (_this.node == 6) {
                _this.node = 1;
            }
        }, function (err) { return console.log(err); });
    }
    UrlService.prototype.insureasset = function (COAF, node) {
        return this.url + '/api/' + node + '/' + this.node + '/' + COAF + '/' + 'insure_asset';
    };
    UrlService.prototype.recordsaleofasset = function (COAF, node, node2) {
        return this.url + '/api/' + node + '/' + node2 + '/' + COAF + '/' + 'record_sale';
    };
    UrlService.prototype.getMe = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_owner';
    };
    UrlService.prototype.getProviders = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_providers';
    };
    UrlService.prototype.getassets = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_assets';
    };
    UrlService.prototype.getassetsforsale = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_assetsforsale';
    };
    UrlService.prototype.announceContract = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/announce';
    };
    UrlService.prototype.updateContract = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/update';
    };
    UrlService.prototype.createowner = function () {
        return this.url + '/api/' + this.node + '/create_owner';
    };
    UrlService.prototype.createasset = function () {
        return this.url + '/api/' + this.node + '/add_asset';
    };
    UrlService.prototype.createinsurer = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/add_insurer';
    };
    UrlService.prototype.getInsurer = function (COAF) {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_insurer';
    };
    UrlService.prototype.getInfo = function (COAF, id) {
        return this.url + '/api/' + this.node + '/' + COAF + '/' + id + '/get_assetinfo';
    };
    return UrlService;
}());
UrlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map