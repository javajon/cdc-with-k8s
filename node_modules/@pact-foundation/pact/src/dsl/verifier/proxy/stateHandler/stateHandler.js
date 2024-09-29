"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxyStateHandler = void 0;
var setupStates_1 = require("./setupStates");
var createProxyStateHandler = function (config) {
    return function (req, res) {
        var message = req.body;
        return Promise.resolve((0, setupStates_1.setupStates)(message, config))
            .then(function (data) { return res.json(data); })
            .catch(function (e) { return res.status(500).send(e); });
    };
};
exports.createProxyStateHandler = createProxyStateHandler;
//# sourceMappingURL=stateHandler.js.map