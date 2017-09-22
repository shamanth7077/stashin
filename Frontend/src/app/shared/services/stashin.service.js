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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var url_service_1 = require("./url.service");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
var user_service_1 = require("./user.service");
var Subject_1 = require("rxjs/Subject");
var StashinService = (function () {
    function StashinService(http, UrlData, userService) {
        this.http = http;
        this.UrlData = UrlData;
        this.userService = userService;
        this.coafObs = new Subject_1.Subject();
        this.setCOAF(undefined);
        this.Url = this.UrlData;
    }
    StashinService.prototype.refresh = function () {
        this.setCOAF(undefined);
        this.setCOAF(this.COAF);
    };
    StashinService.prototype.getCOAF = function () {
        return this.COAF;
    };
    StashinService.prototype.setCOAF = function (_COAF) {
        this.COAF = _COAF;
        this.coafObs.next(this.COAF);
    };
    StashinService.prototype.deploycontract = function (_coaf) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: "stashin",
            coaf: _coaf
        };
        console.log(body);
        return this.http.post(this.Url.deploy, body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.create_owner = function (own) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: own.name,
            SSN: own.SSN,
            coaf: own.COAF,
            status: own.status,
            contactnumber: own.contactnumber,
            age: own.age,
            address: own.address
        };
        console.log(body);
        return this.http.post(this.UrlData.createowner(), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.create_asset = function (ass) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            category: ass.category,
            value: ass.amt,
            availableforsale: ass.availableforsale,
            coaf: this.COAF,
            houseno: ass.houseno,
            amlicenceplate: ass.amlicenceplate,
            automobilemodel: ass.automobilemodel,
            automobilemark: ass.automobilemark,
            enginesize: ass.enginesize,
            street: ass.street,
            postalcode: ass.postalcode,
        };
        console.log(body);
        return this.http.post(this.UrlData.createasset(), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.getMe = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getMe(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    StashinService.prototype.getInsurer = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getInsurer(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    StashinService.prototype.getInfo = function (coaf, id) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getInfo(coaf, id), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    /*
    getContractInfo(coaf: string): Observable<any> {
        let node = this.userService.getUser();
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting contract with coaf ${coaf} from node ${node}`);
        return coaf;
    }*/
    /*
    getowners(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting owners for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getowners(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }*/
    StashinService.prototype.getassets = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("Getting assets for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getassets(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    StashinService.prototype.getassetsforsale = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("Getting assets for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getassetsforsale(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    StashinService.prototype.record_sale = function (_assetforsaleid, _assetid, node, node2, coaf) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            assetid: _assetid,
            assetforsaleid: _assetforsaleid,
        };
        console.log(body);
        return this.http.post(this.UrlData.recordsaleofasset(this.COAF, node, node2), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.create_insurer = function (ins) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: ins.name,
            ampolicy: ins.ampolicy,
            housepolicy: ins.housepolicy,
            housepremieum: ins.housepremieum,
            automobilepremieum: ins.automobilepremieum
        };
        console.log(body);
        return this.http.post(this.UrlData.createinsurer(this.COAF), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.insure_asset = function (ass, ins, node, coaf) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
            name: ins.name,
            id: ass.id
        };
        console.log(body);
        return this.http.post(this.UrlData.insureasset(this.COAF, node), body, { headers: headers })
            .map(function (response) { return response; })
            .catch(function (err) { return Observable_1.Observable.throw(err); });
    };
    StashinService.prototype.getInsurers = function (coaf) {
        var options = new http_1.RequestOptions({
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        });
        console.log("StashService - Getting providers for contract with coaf " + coaf);
        return this.http.get(this.UrlData.getProviders(coaf), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return Observable_1.Observable.throw('Server error'); });
    };
    return StashinService;
}());
StashinService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        url_service_1.UrlService,
        user_service_1.UserService])
], StashinService);
exports.StashinService = StashinService;
//# sourceMappingURL=stashin.service.js.map