"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiBackgroundRemoverError = void 0;
class AiBackgroundRemoverError extends Error {
    isAiBackgroundRemoverError = true;
    sdk = 'AiBackgroundRemover';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AiBackgroundRemoverError = AiBackgroundRemoverError;
//# sourceMappingURL=AiBackgroundRemoverError.js.map