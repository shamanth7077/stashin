/**
 * Created by joerijackers on 07/07/2017.
 */
"use strict";
var owner_class_1 = require("../models/owner.class");
var asset_class_1 = require("../models/asset.class");
var insurer_class_1 = require("../models/insurer.class");
var MockOwner = (function () {
    function MockOwner() {
    }
    return MockOwner;
}());
MockOwner.own = new owner_class_1.Owner('', null, null, null, '', '', null, '');
exports.MockOwner = MockOwner;
var MockInsurer = (function () {
    function MockInsurer() {
    }
    return MockInsurer;
}());
MockInsurer.ins = new insurer_class_1.Insurer('', '', '', '', null, 0, 0);
exports.MockInsurer = MockInsurer;
var MockAsset = (function () {
    function MockAsset() {
    }
    return MockAsset;
}());
MockAsset.ass = new asset_class_1.Asset(MockOwner.own, null, '', null, '', '', null, '', 0, 0, '', 0, false, false, '', '');
exports.MockAsset = MockAsset;
//# sourceMappingURL=mock_input.js.map