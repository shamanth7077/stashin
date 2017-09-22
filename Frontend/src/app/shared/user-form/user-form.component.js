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
var owner_class_1 = require("../models/owner.class");
var insurer_class_1 = require("../models/insurer.class");
var mock_input_1 = require("../data/mock_input");
var user_service_1 = require("../services/user.service");
var UserFormComponent = (function () {
    function UserFormComponent(StashService, users, router) {
        var _this = this;
        this.StashService = StashService;
        this.users = users;
        this.router = router;
        this.refresh = new core_1.EventEmitter();
        this.initInput();
        this.users.userObs.subscribe(function (res) {
            console.log('userform init');
            _this.newowner.name = '';
            _this.newowner.age = null;
            _this.newowner.contactnumber = null;
            _this.newowner.SSN = null;
            _this.newowner.status = '';
            _this.newowner.address = '';
        }, function (err) { return console.log('Error fetching changed user'); });
    }
    UserFormComponent.prototype.initInput = function () {
        this.newowner = mock_input_1.MockOwner.own;
        this.newasset = mock_input_1.MockAsset.ass;
        this.newinsurer = mock_input_1.MockInsurer.ins;
    };
    UserFormComponent.prototype.clearInput = function () {
        this.newowner.name = '';
        //this.newowner = null;
    };
    UserFormComponent.prototype.checkType = function () {
        switch (this.type) {
            case 'owner':
                this.user = 'owner';
                this.create = this.createowner;
                break;
            case 'asset':
                this.user = 'asset';
                this.create = this.createasset;
                break;
            case 'insurer':
                this.user = 'insurer';
                this.create = this.createinsurer;
            default:
                this.user = 'User';
        }
    };
    UserFormComponent.prototype.inputOK = function (inputs) {
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            if (!input) {
                alert('Please fill in all the required fields');
                return false;
            }
        }
        return true;
    };
    UserFormComponent.prototype.createowner = function () {
        var _this = this;
        this.newowner.COAF = this.COAF;
        if (!this.inputOK([this.newowner.name, this.newowner.SSN, this.newowner.status])) {
            return;
        }
        if (this.COAF) {
            this.StashService.create_owner(this.newowner)
                .subscribe(function () {
                alert('Successfully added owner to the Stashin contract');
                _this.clearInput();
                //this.router.navigate(['/home']);
                _this.StashService.refresh();
            }, function (err) { return alert('Error adding owner to the Stashin contract'); });
        }
    };
    UserFormComponent.prototype.createasset = function () {
        var _this = this;
        // this.newBO.sp.name = 'joeri';
        this.newasset.own.COAF = this.COAF;
        if (!this.inputOK([this.newasset.category, this.newasset.availableforsale])) {
            return;
        }
        this.StashService.create_asset(this.newasset)
            .subscribe(function () {
            alert('Successfully added asset to the Stashin contract');
            _this.clearInput();
            _this.StashService.refresh();
        }, function (err) { return alert('Error adding asset to the Stashin contract'); });
    };
    UserFormComponent.prototype.createinsurer = function () {
        var _this = this;
        this.newinsurer.COAF = this.COAF;
        this.StashService.create_insurer(this.newinsurer)
            .subscribe(function () {
            alert('Successfully added insurer to the Stashin contract');
            _this.clearInput();
            //this.router.navigate(['/home']);
            _this.StashService.refresh();
        }, function (err) { return alert('Error adding insurer to the Stashin contract'); });
    };
    UserFormComponent.prototype.ngOnInit = function () {
        this.checkType();
    };
    return UserFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", owner_class_1.Owner)
], UserFormComponent.prototype, "owner", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", insurer_class_1.Insurer)
], UserFormComponent.prototype, "insurer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserFormComponent.prototype, "COAF", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserFormComponent.prototype, "type", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserFormComponent.prototype, "refresh", void 0);
UserFormComponent = __decorate([
    core_1.Component({
        selector: 'user-form',
        templateUrl: './user-form.component.html',
        styleUrls: ['./user-form.component.css']
    }),
    __metadata("design:paramtypes", [stashin_service_1.StashinService, user_service_1.UserService,
        router_1.Router])
], UserFormComponent);
exports.UserFormComponent = UserFormComponent;
//# sourceMappingURL=user-form.component.js.map