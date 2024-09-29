export declare const wrapWithCheck: <F extends (...args: never[]) => boolean>(f: BooleanFunction<F>, contextMessage: string) => (...args: Parameters<F>) => boolean;
declare type BooleanFunction<T> = T extends (...args: infer A) => boolean ? (...args: A) => boolean : never;
declare type BooleanFunctions<T> = {
    [key in keyof T]: BooleanFunction<T[key]>;
};
export declare const wrapAllWithCheck: <T extends BooleanFunctions<T>>(o: T) => BooleanFunctions<T>;
export {};
