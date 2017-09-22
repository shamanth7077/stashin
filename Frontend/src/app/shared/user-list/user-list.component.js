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
var mock_input_1 = require("../data/mock_input");
var mock_input_2 = require("../data/mock_input");
var router_1 = require("@angular/router");
var UserListComponent = (function () {
    // private users: any[];
    function UserListComponent(StashService, router) {
        var _this = this;
        this.StashService = StashService;
        this.router = router;
        this.bo = new core_1.EventEmitter();
        this.users = [];
        this.quotes = [];
        this.coaf = this.StashService.getCOAF();
        this.ins = mock_input_1.MockInsurer.ins;
        this.assetinfo = mock_input_2.MockAsset.ass;
        this.quote1 = Math.round(Math.random() * (10000 - 5000) + 5000);
        this.quote2 = Math.round(Math.random() * (10000 - 5000) + 5000);
        this.assetid = null;
        this.node = null;
        this.flag = false;
        this.flag2 = false;
        this.insured = false;
        this.ass = mock_input_2.MockAsset.ass;
        this.StashService.coafObs.subscribe(function (res) { return _this.coaf = res; });
    }
    // getUsers() {
    //     this.StashService.getProviders(this.coaf)
    //         .subscribe(
    //             res => {
    //                 this.users = res.providers;
    //                 const regIds = this.users.map(x => x.NodeId);
    //                 this.regNodes.emit(regIds);
    //                 console.log(this.users);
    //             },
    //             err => console.log(err)
    //     );
    // }
    UserListComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'owner':
                this.user = 'owner';
                break;
            case 'asset':
                this.user = 'asset';
                break;
            default:
                this.user = 'User';
        }
    };
    UserListComponent.prototype.deleteUser = function () { };
    UserListComponent.prototype.AssignInsurer = function (user) {
        this.user = 'insurer';
        this.ass = user;
        this.category = user.category;
        this.getInsurers();
    };
    UserListComponent.prototype.getInsurers = function () {
        var _this = this;
        if (this.coaf) {
            this.StashService.getInsurers(this.coaf)
                .subscribe(function (res) {
                _this.Insurers = res.providers;
                console.log(_this.Insurers);
            }, function (err) { return console.log(err); });
        }
    };
    UserListComponent.prototype.create = function (ins2) {
        var _this = this;
        this.ins = ins2;
        this.node = ins2.NodeId;
        this.StashService.insure_asset(this.ass, this.ins, this.node, this.coaf)
            .subscribe(function () {
            alert('Successfully insured asset');
            //this.router.navigate(['/home']);
            _this.insured = true;
            _this.user = 'owner';
            _this.StashService.refresh();
        }, function (err) { return alert('Error insuring asset'); });
    };
    UserListComponent.prototype.GetAssetInfo = function (user) {
        var _this = this;
        this.assetid = user.id;
        this.user = "assetinfo";
        this.StashService.getInfo(this.coaf, this.assetid)
            .subscribe(function (res) {
            _this.assetinfo.category = res.category;
            if (res.category == "Automobile") {
                _this.assetinfo.amlicenceplate = res.amlicenceplate;
                _this.assetinfo.automobilemodel = res.automobilemodel;
                _this.assetinfo.automobilemark = res.automobilemark;
                _this.assetinfo.enginesize = res.enginesize;
            }
            else {
                _this.assetinfo.houseno = res.houseno;
                _this.assetinfo.street = res.street;
                _this.assetinfo.postalcode = res.postalcode;
            }
            console.log(_this.Insurers);
        }, function (err) { return console.log(err); });
    };
    UserListComponent.prototype.getquote1 = function (a) {
        this.quotes[0] = Math.round(Math.random() * (10000 - 5000) + 5000);
        this.flag = true;
    };
    UserListComponent.prototype.getquote2 = function () {
        this.quotes[1] = Math.round(Math.random() * (10000 - 5000) + 5000);
        this.flag2 = true;
    };
    UserListComponent.prototype.categoryautomobile = function () {
        if (this.category === 'Automobile') {
            return true;
        }
        else {
            return false;
        }
    };
    UserListComponent.prototype.categoryhouse = function () {
        if (this.category === 'House') {
            return true;
        }
        else {
            return false;
        }
    };
    UserListComponent.prototype.open = function () {
    };
    UserListComponent.prototype.return = function () {
        this.user = 'asset';
    };
    UserListComponent.prototype.ngOnInit = function () {
        this.checkType();
        // this.getUsers();
    };
    return UserListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserListComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UserListComponent.prototype, "users", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserListComponent.prototype, "bo", void 0);
UserListComponent = __decorate([
    core_1.Component({
        selector: 'user-list',
        templateUrl: './user-list.component.html',
        styleUrls: ['./user-list.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService, router_1.Router])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map