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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("@pact-foundation/pact-core/src/logger"));
var package_json_1 = require("../../package.json");
__exportStar(require("@pact-foundation/pact-core/src/logger"), exports);
var context = "pact@".concat(package_json_1.version);
exports.default = {
    pactCrash: function (message) { return logger_1.default.pactCrash(message, context); },
    error: function (message) { return logger_1.default.error(message, context); },
    warn: function (message) { return logger_1.default.warn(message, context); },
    info: function (message) { return logger_1.default.info(message, context); },
    debug: function (message) { return logger_1.default.debug(message, context); },
    trace: function (message) { return logger_1.default.trace(message, context); },
};
//# sourceMappingURL=logger.js.map