import { ServerError } from "@root/core/index";

class UnauthorizedError extends ServerError {
    public constructor(message = "You are not allowed to access this resource.", data?: Object) {
        super(401, message, "ERR_UNAUTHORIZED", data);
    }
}

export { UnauthorizedError };
export default UnauthorizedError;