"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnValidationStatus = exports.deprecatedFunction = void 0;
const logger_1 = __importDefault(require("../../logger"));
const deprecatedFunction = (_, property) => {
    logger_1.default.warn(`${property} is deprecated and no longer has any effect`);
    return true;
};
exports.deprecatedFunction = deprecatedFunction;
var FnValidationStatus;
(function (FnValidationStatus) {
    FnValidationStatus[FnValidationStatus["SUCCESS"] = 0] = "SUCCESS";
    FnValidationStatus[FnValidationStatus["IGNORE"] = 1] = "IGNORE";
    FnValidationStatus[FnValidationStatus["FAIL"] = 2] = "FAIL";
})(FnValidationStatus = exports.FnValidationStatus || (exports.FnValidationStatus = {}));
//# sourceMappingURL=types.js.map