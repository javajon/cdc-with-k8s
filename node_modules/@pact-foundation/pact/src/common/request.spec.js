"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var nock_1 = __importDefault(require("nock"));
var request_1 = require("./request");
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
describe('Request', function () {
    var request;
    var port = 1024 + Math.floor(Math.random() * 5000);
    var url = "http://localhost:".concat(port);
    var urlSecure = "https://localhost:".concat(port);
    beforeEach(function () {
        request = new request_1.Request();
    });
    context('#send', function () {
        afterEach(function () { return nock_1.default.cleanAll(); });
        describe('Promise', function () {
            it('returns a promise', function () {
                (0, nock_1.default)(url).get('/').reply(200);
                var r = request.send(request_1.HTTPMethods.GET, url);
                return Promise.all([
                    expect(r).is.ok,
                    expect(r.then).is.ok,
                    expect(r.then).is.a('function'),
                    expect(r).to.be.fulfilled,
                ]);
            });
            it('resolves when request succeeds with response body', function () {
                var body = 'body';
                (0, nock_1.default)(url).get('/').reply(200, body);
                var p = request.send(request_1.HTTPMethods.GET, url);
                return Promise.all([
                    expect(p).to.be.fulfilled,
                    expect(p).to.eventually.be.equal(body),
                ]);
            });
            it('rejects when request fails with error message', function () {
                var error = 'error';
                (0, nock_1.default)(url).get('/').reply(400, error);
                var p = request.send(request_1.HTTPMethods.GET, url);
                return expect(p).to.be.rejectedWith(error);
            });
        });
        describe('Headers', function () {
            it('sends Pact headers are sent with every request', function () {
                (0, nock_1.default)(url)
                    .matchHeader('X-Pact-Mock-Service', 'true')
                    .get('/')
                    .reply(200);
                return expect(request.send(request_1.HTTPMethods.GET, url)).to.be.fulfilled;
            });
        });
        describe('SSL', function () {
            it('ignores self signed certificate errors', function () {
                (0, nock_1.default)(urlSecure)
                    .matchHeader('X-Pact-Mock-Service', 'true')
                    .get('/')
                    .reply(200);
                return expect(request.send(request_1.HTTPMethods.GET, urlSecure)).to.be.fulfilled;
            });
        });
    });
});
//# sourceMappingURL=request.spec.js.map