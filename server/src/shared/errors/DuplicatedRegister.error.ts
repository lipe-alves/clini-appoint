import { ServerError } from "@root/core/index";

class DuplicatedRegisterError extends ServerError {
    public constructor(entityName: string, fieldName: string, value: string | number) {
        super(400, `${entityName} with ${fieldName} "${value}" already exists.`, "ERR_DUPLICATED_REGISTER", {
            entityName,
            fieldName,
            value
        });
    }
}

export { DuplicatedRegisterError };
export default DuplicatedRegisterError;