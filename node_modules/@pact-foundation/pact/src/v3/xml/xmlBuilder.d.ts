import { XmlElement } from './xmlElement';
/**
 * XML Builder class for constructing XML documents with matchers
 */
export declare class XmlBuilder {
    private version;
    private charset;
    private root;
    constructor(version: string, charset: string, rootElement: string);
    build(callback: (doc: XmlElement) => void): string;
}
