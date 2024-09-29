"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStates = void 0;
var logger_1 = __importDefault(require("../../../../common/logger"));
var isStateFuncWithSetup = function (fn) {
    return fn.setup !== undefined ||
        fn.teardown !== undefined;
};
// Transform a regular state function to one with the setup/teardown functions
var transformStateFunc = function (fn) {
    return isStateFuncWithSetup(fn) ? fn : { setup: fn };
};
// Lookup the handler based on the description
var setupStates = function (state, config) {
    logger_1.default.debug("setting up state '".concat(JSON.stringify(state), "'"));
    var handler = config.stateHandlers
        ? config.stateHandlers[state.state]
        : null;
    if (!handler) {
        if (state.action === 'setup') {
            logger_1.default.warn("no state handler found for state: \"".concat(state.state, "\""));
        }
        return Promise.resolve();
    }
    var stateFn = transformStateFunc(handler);
    switch (state.action) {
        case 'setup':
            if (stateFn.setup) {
                logger_1.default.debug("setting up state '".concat(state.state, "'"));
                return stateFn.setup(state.params);
            }
            break;
        case 'teardown':
            if (stateFn.teardown) {
                logger_1.default.debug("tearing down state '".concat(state.state, "'"));
                return stateFn.teardown(state.params);
            }
            break;
        default:
            logger_1.default.debug("unknown state action '".concat(state.action, "' received, ignoring"));
    }
    return Promise.resolve();
};
exports.setupStates = setupStates;
//# sourceMappingURL=setupStates.js.map