"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verifier = void 0;
const logger_1 = __importDefault(require("../logger"));
const nativeVerifier_1 = require("./nativeVerifier");
const validateOptions_1 = require("./validateOptions");
const applyDefaults = (options) => ({
    timeout: 30000,
    logLevel: 'info',
    ...options,
});
class Verifier {
    constructor(options) {
        this.options = (0, validateOptions_1.validateOptions)(applyDefaults(options));
    }
    verify() {
        logger_1.default.info('Verifying Pact Files');
        return (0, nativeVerifier_1.verify)(this.options);
    }
}
exports.Verifier = Verifier;
exports.default = (options) => new Verifier(options);
//# sourceMappingURL=index.js.map