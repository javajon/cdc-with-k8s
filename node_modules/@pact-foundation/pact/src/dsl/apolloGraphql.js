"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloGraphQLInteraction = void 0;
var graphql_1 = require("./graphql");
var ApolloGraphQLInteraction = /** @class */ (function (_super) {
    __extends(ApolloGraphQLInteraction, _super);
    function ApolloGraphQLInteraction() {
        var _this = _super.call(this) || this;
        _this.variables = _this.variables || {};
        _this.operation = _this.operation || null;
        return _this;
    }
    return ApolloGraphQLInteraction;
}(graphql_1.GraphQLInteraction));
exports.ApolloGraphQLInteraction = ApolloGraphQLInteraction;
//# sourceMappingURL=apolloGraphql.js.map