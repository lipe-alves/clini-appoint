class ServerError extends Error {
    public readonly status: number;
    public readonly data: Object;
    public readonly code: string;
    
    public constructor(status: number, message: string, code: string, data: Object = {}) {
        super(message);
        this.status = status;
        this.data = data;
        this.code = code;
    }

    public static create(err: any) {
        return new ServerError(
            err?.status || 500, 
            err?.message || "An unknown error has occurred.", 
            err?.code || "ERR_UNKNOWN"
        );
    }
}

export { ServerError };
export default ServerError;