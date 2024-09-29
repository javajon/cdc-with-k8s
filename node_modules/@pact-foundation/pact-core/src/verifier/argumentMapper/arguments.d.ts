import { FnMapping } from './types';
import { InternalPactVerifierOptions } from '../types';
import { FfiVerificationFunctions } from '../../ffi/types';
declare type IgnoredFfiFunctions = {
    pactffiVerifierNewForApplication: 1;
    pactffiVerifierExecute: 1;
    pactffiVerifierShutdown: 1;
};
declare type MergedFfiSourceFunctions = {
    pactffiVerifierAddFileSource: 1;
    pactffiVerifierUrlSource: 1;
};
declare type RequiredFfiVerificationFunctions = Omit<FfiVerificationFunctions, keyof (IgnoredFfiFunctions & MergedFfiSourceFunctions)>;
declare type OrderedExecution = {
    [Key in keyof RequiredFfiVerificationFunctions]: number;
};
export declare const orderOfExecution: OrderedExecution;
export declare const ffiFnMapping: FnMapping<RequiredFfiVerificationFunctions, InternalPactVerifierOptions>;
export {};
