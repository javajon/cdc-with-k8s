"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var sinon_1 = __importDefault(require("sinon"));
var pact_core_1 = __importDefault(require("@pact-foundation/pact-core"));
var proxy = __importStar(require("./proxy/proxy"));
var logger_1 = __importDefault(require("../../common/logger"));
var verifier_1 = require("./verifier");
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
describe('Verifier', function () {
    afterEach(function () {
        sinon_1.default.restore();
    });
    var state = 'thing exists';
    var v;
    var opts;
    var executed;
    var providerBaseUrl = 'http://not.exists';
    beforeEach(function () {
        var _a;
        executed = false;
        opts = {
            providerBaseUrl: providerBaseUrl,
            requestFilter: function (req, res, next) {
                next();
            },
            stateHandlers: (_a = {},
                _a[state] = function () {
                    executed = true;
                    return Promise.resolve();
                },
                _a),
        };
    });
    describe('#constructor', function () {
        describe('when given configuration', function () {
            it('sets the configuration on the object', function () {
                v = new verifier_1.Verifier(opts);
                expect(v).to.have.deep.property('config').includes({
                    providerBaseUrl: providerBaseUrl,
                });
                expect(v).to.have.nested.property('config.stateHandlers');
                expect(v).to.have.nested.property('config.requestFilter');
            });
        });
    });
    describe('options handling', function () {
        var spy;
        beforeEach(function () {
            spy = sinon_1.default.spy(pact_core_1.default, 'logLevel');
        });
        context('when logLevel is provided', function () {
            it('sets the log level on pact node', function () {
                v = new verifier_1.Verifier(__assign(__assign({}, opts), { logLevel: 'debug' }));
                expect(spy.callCount).to.eql(1);
            });
        });
        context('when logLevel is not provided', function () {
            it('does not modify the log setting', function () {
                var rest = __rest(opts, []);
                v = new verifier_1.Verifier(__assign({}, rest));
                expect(spy.callCount).to.eql(0);
            });
        });
        context('when a deprecated field is provided', function () {
            it('logs a warning', function () {
                spy = sinon_1.default.spy(logger_1.default, 'warn');
                v = new verifier_1.Verifier(__assign(__assign({}, opts), { providerStatesSetupUrl: 'http://foo.com' }));
                expect(spy.callCount).to.eql(1);
            });
        });
    });
    describe('#verifyProvider', function () {
        beforeEach(function () {
            sinon_1.default.stub(proxy, 'createProxy').returns({
                close: function () {
                    executed = true;
                    return {};
                },
                address: function () { return ({
                    port: 1234,
                    family: 'https',
                    address: 'mock.server.example.com',
                }); },
            });
            sinon_1.default.stub(proxy, 'waitForServerReady').returns(Promise.resolve());
        });
        describe('when no configuration has been given', function () {
            it('fails with an error', function () {
                return expect(function () { return new verifier_1.Verifier(undefined); }).to.throw();
            });
        });
        describe('when the verifier has been configured', function () {
            beforeEach(function () {
                v = new verifier_1.Verifier(__assign(__assign({}, opts), { logLevel: 'trace' }));
            });
            context('and the verification runs successfully', function () {
                it('closes the server and returns the result', function () {
                    sinon_1.default
                        .stub(v, 'runProviderVerification')
                        .returns(Promise.resolve('done'));
                    var res = v.verifyProvider();
                    return expect(res).to.eventually.be.fulfilled.then(function () {
                        expect(executed).to.be.true;
                    });
                });
            });
            context('and the verification fails', function () {
                it('closes the server and returns the result', function () {
                    sinon_1.default
                        .stub(v, 'runProviderVerification')
                        .returns(function () { return Promise.reject(new Error('error')); });
                    var res = v.verifyProvider();
                    return expect(res).to.eventually.be.rejected.then(function () {
                        expect(executed).to.be.true;
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=verifier.spec.js.map