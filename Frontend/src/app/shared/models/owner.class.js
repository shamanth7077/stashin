"use strict";
var Owner = (function () {
    function Owner(name, age, SSN, contactnumber, COAF, status, noofassets, address) {
        this.name = name;
        this.age = age;
        this.SSN = SSN;
        this.contactnumber = contactnumber;
        this.COAF = COAF;
        this.status = status;
        this.noofassets = noofassets;
        this.address = address;
    }
    return Owner;
}());
exports.Owner = Owner;
//# sourceMappingURL=owner.class.js.map