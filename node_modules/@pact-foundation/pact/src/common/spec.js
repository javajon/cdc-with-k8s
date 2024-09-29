"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToSpec = void 0;
var v3_1 = require("../v3");
var numberToSpec = function (spec, defaultSpec) {
    if (defaultSpec === void 0) { defaultSpec = v3_1.SpecificationVersion.SPECIFICATION_VERSION_V2; }
    if (!spec) {
        return defaultSpec;
    }
    switch (spec) {
        case 2:
            return v3_1.SpecificationVersion.SPECIFICATION_VERSION_V2;
        case 3:
            return v3_1.SpecificationVersion.SPECIFICATION_VERSION_V3;
        case 4:
            return v3_1.SpecificationVersion.SPECIFICATION_VERSION_V4;
        default:
            throw new Error("invalid pact specification version supplied: ".concat(spec));
    }
};
exports.numberToSpec = numberToSpec;
//# sourceMappingURL=spec.js.map