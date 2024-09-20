"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorApi = void 0;
class ErrorApi extends Error {
    withStatus(_arg0) {
        throw new Error("Method not implemented.");
    }
    constructor(message, status = 500, safe = false) {
        super(message);
        this.status = status;
        this.safe = safe;
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
}
exports.ErrorApi = ErrorApi;
