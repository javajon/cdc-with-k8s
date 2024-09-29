"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var apolloGraphql_1 = require("./apolloGraphql");
chai_1.default.use(chai_as_promised_1.default);
var expect = chai_1.default.expect;
describe('ApolloGraphQLInteraction', function () {
    var interaction;
    beforeEach(function () {
        interaction = new apolloGraphql_1.ApolloGraphQLInteraction();
    });
    describe('#withVariables', function () {
        describe('when given a set of variables', function () {
            it('adds the variables to the payload', function () {
                interaction.uponReceiving('a request');
                interaction.withRequest({
                    path: '/graphql',
                    method: 'POST',
                });
                interaction.withOperation('query');
                interaction.withQuery('{ hello }');
                interaction.withVariables({
                    foo: 'bar',
                });
                interaction.willRespondWith({
                    status: 200,
                    body: { data: {} },
                });
                var json = interaction.json();
                expect(json.request.body.variables).to.deep.eq({ foo: 'bar' });
            });
        });
        describe('when no variables are presented', function () {
            it('adds an empty variables property to the payload', function () {
                interaction.uponReceiving('a request');
                interaction.withRequest({
                    path: '/graphql',
                    method: 'POST',
                });
                interaction.withOperation('query');
                interaction.withQuery('{ hello }');
                interaction.willRespondWith({
                    status: 200,
                    body: { data: {} },
                });
                var json = interaction.json();
                expect(json.request.body).to.have.property('variables');
            });
        });
    });
    describe('#withOperation', function () {
        describe('when no operationNaame is presented', function () {
            it('adds a null operationName property to the payload', function () {
                interaction.uponReceiving('a request');
                interaction.withRequest({
                    path: '/graphql',
                    method: 'POST',
                });
                interaction.withQuery('{ hello }');
                interaction.willRespondWith({
                    status: 200,
                    body: { data: {} },
                });
                var json = interaction.json();
                expect(json.request.body).to.have.property('operationName');
            });
        });
    });
});
//# sourceMappingURL=apolloGraphql.spec.js.map