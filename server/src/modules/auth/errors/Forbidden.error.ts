import { ServerError } from "@root/core/index";

class ForbiddenError extends ServerError {
    public constructor(message = "Session invalid or expired.", data?: Object) {
        super(403, message, "ERR_FORBIDDEN", data);
    }
}

export { ForbiddenError };
export default ForbiddenError;