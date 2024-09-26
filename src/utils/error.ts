export class ErrorApi extends Error {
    public status: number;
    public safe: boolean;

    constructor(message: string, status: number = 500, safe: boolean = false) {
        super(message);
        this.status = status;
        this.safe = safe;
        this.name = 'ErrorApi'; 
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

    withStatus(status: number): this {
        this.status = status; 
        return this; 
    }
}
