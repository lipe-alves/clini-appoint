import { ServerError } from "@root/core/index";

class ResourceNotFoundError extends ServerError {
    public constructor(entityName: string, fieldName: string, fieldValue: string | number) {
        super(404, `${entityName} of ${fieldName} "${fieldValue}" not found.`, "ERR_NOT_FOUND", {
            entityName,
            fieldName,
            fieldValue
        });
    }
}

export { ResourceNotFoundError };
export default ResourceNotFoundError;