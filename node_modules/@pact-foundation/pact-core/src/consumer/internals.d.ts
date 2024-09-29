import { Ffi, FfiPactHandle } from '../ffi/types';
import { MatchingResult } from './types';
export declare const mockServerMismatches: (ffi: Ffi, port: number) => MatchingResult[];
export declare const writePact: (ffi: Ffi, pactPtr: FfiPactHandle, dir: string, merge?: boolean, port?: number) => void;
