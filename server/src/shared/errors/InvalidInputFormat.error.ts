import { ServerError } from "@root/core/index";

class InvalidInputFormatError extends ServerError {
    public constructor(fieldName: string, validFormats: string[]) {
        super(400, `Invalid format for field ${fieldName}.`, "ERR_INVALID_INPUT", {
            fieldName,
            validFormats
        });
    }
}

export { InvalidInputFormatError };
export default InvalidInputFormatError;