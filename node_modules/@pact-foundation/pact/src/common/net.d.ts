/**
 * Network module.
 * @module net
 * @private
 */
export declare const localAddresses: string[];
export declare const portCheck: (port: number, host: string) => Promise<void>;
export declare const isPortAvailable: (port: number, host: string) => Promise<void>;
export declare const freePort: () => Promise<number>;
