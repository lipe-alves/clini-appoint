import { ServerError } from "@root/core/index";

class RequiredFieldError extends ServerError {
    public constructor(fieldName: string) {
        super(400, "Required field missing.", "ERR_REQUIRED_FIELD", { fieldName });
    }
}

export { RequiredFieldError };
export default RequiredFieldError;