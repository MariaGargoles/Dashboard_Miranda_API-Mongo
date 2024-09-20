export class ErrorApi extends Error {
    withStatus(_arg0: number) {
        throw new Error("Method not implemented.");
    }
    status: number;
    safe: boolean;

    constructor(message: string, status: number = 500, safe: boolean = false) {
        super(message);
        this.status = status;
        this.safe = safe;
    }

    static fromMessage(message: string): ErrorApi {
        return new ErrorApi(message);
    }

    static fromStatus(message: string, status: number): ErrorApi {
        return new ErrorApi(message, status);
    }

    static fromSafe(message: string, safe: boolean): ErrorApi {
        return new ErrorApi(message, 500, safe);
    }
}
