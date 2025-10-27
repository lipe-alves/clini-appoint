import { ServerError } from "@root/core/index";

class NotAllowedFieldError extends ServerError {
    public constructor(fieldName: string) {
        super(400, `"${fieldName}" cannot be set.`, "ERR_FIELD_NOT_ALLOWED", {
            fieldName
        });
    }
}

export { NotAllowedFieldError };
export default NotAllowedFieldError;