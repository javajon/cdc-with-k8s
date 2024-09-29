"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapAllWithCheck = exports.wrapWithCheck = void 0;
const logger_1 = __importDefault(require("../logger"));
const wrapWithCheck = (f, contextMessage) => (...args) => {
    const result = f(...args);
    if (!result) {
        logger_1.default.pactCrash(`The pact consumer core returned false at '${contextMessage}'. This\nshould only happen if the core methods were invoked out of order`);
    }
    return result;
};
exports.wrapWithCheck = wrapWithCheck;
const wrapAllWithCheck = (o) => Object.keys(o)
    .map((key) => ({
    [key]: (0, exports.wrapWithCheck)(o[key], key),
}))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
exports.wrapAllWithCheck = wrapAllWithCheck;
//# sourceMappingURL=checkErrors.js.map