"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var proxy_1 = require("./proxy");
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
// Little function to mock out an Event Emitter
var fakeServer = function (event) { return ({
    on: function (registeredEvent, cb) {
        if (registeredEvent === event) {
            cb();
        }
    },
}); };
describe('#waitForServerReady', function () {
    context('when the server starts successfully', function () {
        it('returns a successful promise', function () {
            var res = (0, proxy_1.waitForServerReady)(fakeServer('listening'));
            return expect(res).to.eventually.be.fulfilled;
        });
    });
    context('when the server fails to start', function () {
        it('returns an error', function () {
            var res = (0, proxy_1.waitForServerReady)(fakeServer('error'));
            return expect(res).to.eventually.be.rejected;
        });
    });
});
//# sourceMappingURL=proxy.spec.js.map