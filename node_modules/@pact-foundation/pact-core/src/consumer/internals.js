"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePact = exports.mockServerMismatches = void 0;
const types_1 = require("../ffi/types");
const logger_1 = require("../logger");
const mockServerMismatches = (ffi, port) => {
    const results = JSON.parse(ffi.pactffiMockServerMismatches(port));
    return results.map((result) => ({
        ...result,
        ...('mismatches' in result
            ? {
                mismatches: result.mismatches.map((m) => typeof m === 'string' ? JSON.parse(m) : m),
            }
            : {}),
    }));
};
exports.mockServerMismatches = mockServerMismatches;
const writePact = (ffi, pactPtr, dir, merge = true, port = 0) => {
    let result;
    if (port) {
        result = ffi.pactffiWritePactFileByPort(port, dir, !merge);
    }
    else {
        result = ffi.pactffiWritePactFile(pactPtr, dir, !merge);
    }
    switch (result) {
        case types_1.FfiWritePactResponse['SUCCESS']:
            return;
        case types_1.FfiWritePactResponse['UNABLE_TO_WRITE_PACT_FILE']:
            (0, logger_1.logErrorAndThrow)('The pact core was unable to write the pact file');
            break;
        case types_1.FfiWritePactResponse['GENERAL_PANIC']:
            (0, logger_1.logCrashAndThrow)('The pact core panicked while writing the pact file');
            break;
        case types_1.FfiWritePactResponse['MOCK_SERVER_NOT_FOUND']:
            (0, logger_1.logCrashAndThrow)('The pact core was asked to write a pact file from a mock server that appears not to exist');
            break;
        default:
            (0, logger_1.logCrashAndThrow)(`The pact core returned an unknown error code (${result}) instead of writing the pact`);
    }
};
exports.writePact = writePact;
//# sourceMappingURL=internals.js.map