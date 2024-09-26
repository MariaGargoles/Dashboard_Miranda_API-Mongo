"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorApi = void 0;
class ErrorApi extends Error {
    constructor(message, status = 500, safe = false) {
        super(message);
        this.status = status;
        this.safe = safe;
        this.name = 'ErrorApi';
    }
    static fromMessage(message) {
        return new ErrorApi(message);
    }
    static fromStatus(message, status) {
        return new ErrorApi(message, status);
    }
    static fromSafe(message, safe) {
        return new ErrorApi(message, 500, safe);
    }
    withStatus(status) {
        this.status = status;
        return this;
    }
}
exports.ErrorApi = ErrorApi;
