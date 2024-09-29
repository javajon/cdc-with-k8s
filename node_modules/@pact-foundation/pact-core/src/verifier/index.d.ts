import { VerifierOptions } from './types';
export declare class Verifier {
    readonly options: VerifierOptions;
    constructor(options: VerifierOptions);
    verify(): Promise<string>;
}
declare const _default: (options: VerifierOptions) => Verifier;
export default _default;
