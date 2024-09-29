import { Ffi, FfiHandle } from '../../ffi/types';
export declare const deprecatedFunction: (_: unknown, property: string) => boolean;
declare type KeyedObject = {
    [key: string]: unknown;
};
declare type FnArgumentMapping<O> = {
    validateAndExecute: (ffi: Ffi, handle: FfiHandle, options: O) => FnValidationResult;
};
export declare type FnMapping<T extends KeyedObject, O> = {
    [Key in keyof T]: FnArgumentMapping<O>;
};
export declare enum FnValidationStatus {
    SUCCESS = 0,
    IGNORE = 1,
    FAIL = 2
}
declare type FnValidationResultSuccess = {
    status: FnValidationStatus.SUCCESS;
};
declare type FnValidationResultFail = {
    status: FnValidationStatus.FAIL;
    messages: string[];
};
declare type FnValidationResultIgnore = {
    status: FnValidationStatus.IGNORE;
    messages: string[];
};
export declare type FnValidationResult = FnValidationResultSuccess | FnValidationResultFail | FnValidationResultIgnore;
export {};
