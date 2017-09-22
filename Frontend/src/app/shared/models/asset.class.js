"use strict";
var Asset = (function () {
    function Asset(own, id, category, amlicenceplate, automobilemodel, automobilemark, enginesize, variant, amt, houseno, street, postalcode, availableforsale, insured, insurername, typeofinsurance) {
        this.own = own;
        this.id = id;
        this.category = category;
        this.amlicenceplate = amlicenceplate;
        this.automobilemodel = automobilemodel;
        this.automobilemark = automobilemark;
        this.enginesize = enginesize;
        this.variant = variant;
        this.amt = amt;
        this.houseno = houseno;
        this.street = street;
        this.postalcode = postalcode;
        this.availableforsale = availableforsale;
        this.insured = insured;
        this.insurername = insurername;
        this.typeofinsurance = typeofinsurance;
    }
    return Asset;
}());
exports.Asset = Asset;
//# sourceMappingURL=asset.class.js.map