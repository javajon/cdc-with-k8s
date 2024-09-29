/**
 * @module Message
 */
import * as http from 'http';
import { MessageProvider } from './dsl/message';
import { PactMessageProviderOptions } from './dsl/options';
export declare const waitForServerReady: (server: http.Server) => Promise<http.Server>;
export declare const setupProxyServer: (app: (request: http.IncomingMessage, response: http.ServerResponse) => void) => http.Server;
export declare const providerWithMetadata: (provider: MessageProvider, metadata: Record<string, string>) => MessageProvider;
/**
 * A Message Provider is analagous to Consumer in the HTTP Interaction model.
 *
 * It is the initiator of an interaction, and expects something on the other end
 * of the interaction to respond - just in this case, not immediately.
 */
export declare class MessageProviderPact {
    private config;
    constructor(config: PactMessageProviderOptions);
    /**
     * Verify a Message Provider.
     */
    verify(): Promise<unknown>;
    private runProviderVerification;
    private setupVerificationHandler;
    private setupProxyApplication;
    private setupStates;
    private findHandler;
}
