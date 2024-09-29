"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlBuilder = void 0;
var xmlElement_1 = require("./xmlElement");
/**
 * XML Builder class for constructing XML documents with matchers
 */
var XmlBuilder = /** @class */ (function () {
    function XmlBuilder(version, charset, rootElement) {
        this.version = version;
        this.charset = charset;
        this.root = new xmlElement_1.XmlElement(rootElement);
    }
    XmlBuilder.prototype.build = function (callback) {
        callback(this.root);
        return JSON.stringify(this);
    };
    return XmlBuilder;
}());
exports.XmlBuilder = XmlBuilder;
//# sourceMappingURL=xmlBuilder.js.map