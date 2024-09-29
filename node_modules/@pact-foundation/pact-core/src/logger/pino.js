"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const createLogger = (level) => (0, pino_1.pino)({
    level: level.toLowerCase(),
}, (0, pino_pretty_1.default)({ sync: true }));
exports.createLogger = createLogger;
//# sourceMappingURL=pino.js.map