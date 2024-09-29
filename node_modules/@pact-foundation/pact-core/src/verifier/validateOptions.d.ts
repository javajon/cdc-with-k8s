import { InternalPactVerifierOptions, VerifierOptions } from './types';
export declare const deprecatedFunction: () => (_: unknown, property: string) => boolean;
export declare const deprecatedBy: (preferredOption: string) => () => (_: unknown, property: string) => boolean;
export declare const incompatibleWith: (keys: (keyof InternalPactVerifierOptions)[]) => (options: InternalPactVerifierOptions) => (_: unknown, property: string) => boolean;
export declare const requires: (keys: (keyof InternalPactVerifierOptions)[]) => (options: InternalPactVerifierOptions) => (_: unknown, property: string) => boolean;
export declare const requiresOneOf: (keys: (keyof InternalPactVerifierOptions)[]) => (options: InternalPactVerifierOptions) => (_: unknown, property: string) => boolean;
declare type AssertFunction = (a: unknown, property: string) => boolean;
export declare type ArgumentValidationRules<T> = {
    [Key in keyof T]-?: ((options: T) => AssertFunction)[];
};
export declare const validationRules: ArgumentValidationRules<InternalPactVerifierOptions>;
export declare const validateOptions: (options: VerifierOptions) => VerifierOptions;
export {};
