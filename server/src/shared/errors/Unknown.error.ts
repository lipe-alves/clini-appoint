import { ServerError } from "@root/core/index";

class UnknownError extends ServerError {
    public constructor(data?: Object) {
        super(500, "An unknown error has occurred.", "ERR_UNKNOWN", data);
    }
}

export { UnknownError };
export default UnknownError;