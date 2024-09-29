import { JsonMap } from '../common/jsonTypes';
import { PactV3Options, V3Interaction, V3MockServer, V3Request, V3Response } from './types';
export declare class PactV3 {
    private opts;
    private states;
    private pact;
    private interaction;
    constructor(opts: PactV3Options);
    addInteraction(interaction: V3Interaction): PactV3;
    given(providerState: string, parameters?: JsonMap): PactV3;
    uponReceiving(description: string): PactV3;
    withRequest(req: V3Request): PactV3;
    withRequestBinaryFile(req: V3Request, contentType: string, file: string): PactV3;
    withRequestMultipartFileUpload(req: V3Request, contentType: string, file: string, mimePartName: string): PactV3;
    willRespondWith(res: V3Response): PactV3;
    withResponseBinaryFile(res: V3Response, contentType: string, file: string): PactV3;
    withResponseMultipartFileUpload(res: V3Response, contentType: string, file: string, mimePartName: string): PactV3;
    executeTest<T>(testFn: (mockServer: V3MockServer) => Promise<T>): Promise<T | undefined>;
    private cleanup;
    private setup;
}
