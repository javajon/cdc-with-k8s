"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVerification = void 0;
const underscore_1 = require("underscore");
const types_1 = require("./types");
const logger_1 = __importStar(require("../../logger"));
const arguments_1 = require("./arguments");
const setupVerification = (ffi, handle, options) => {
    const order = (0, underscore_1.values)(arguments_1.orderOfExecution).sort((a, b) => a - b);
    const functionsToCall = (0, underscore_1.invert)(arguments_1.orderOfExecution);
    order.forEach((k) => {
        const fn = functionsToCall[k];
        const validation = arguments_1.ffiFnMapping[fn].validateAndExecute(ffi, handle, options);
        switch (validation.status) {
            case types_1.FnValidationStatus.FAIL:
                (0, logger_1.logErrorAndThrow)(`the required ffi function '${fn}' failed validation with errors: ${validation.messages}`);
                break;
            case types_1.FnValidationStatus.IGNORE:
                logger_1.default.debug(`the optional ffi function '${fn}' was not executed as it had non-fatal validation errors: ${validation.messages}`);
                break;
            case types_1.FnValidationStatus.SUCCESS:
                break;
            default:
                (0, logger_1.logCrashAndThrow)(`the ffi function '${fn}' returned the following unrecognised validation signal: '${validation.status}'`);
        }
    });
};
exports.setupVerification = setupVerification;
//# sourceMappingURL=index.js.map