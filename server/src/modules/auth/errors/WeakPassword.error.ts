import { ServerError } from "@root/core/index";

class WeakPasswordError extends ServerError {
    public constructor(errors: string[], message = "Password is weak.") {
        super(400, message, "ERR_FORBIDDEN", {
            errors
        });
    }
}

export { WeakPasswordError };
export default WeakPasswordError;