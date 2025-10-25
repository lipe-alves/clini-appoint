import { ServerError } from "@root/core/index";

class InternalServerError extends ServerError {
    public constructor(message: string, data?: Object) {
        super(500, message, "ERR_INTERNAL_SERVER", data);
    }
}

export { InternalServerError };
export default InternalServerError;