import Schema, { SchemaConfig } from "@root/core/Schema"
import { IDatabase, databaseSchema } from "@root/modules/databases/models/Database.model";
import UpdateModelDto, { validateUpdateModelDto } from "@root/shared/dtos/UpdateModel.dto";

type UpdateDatabaseDto = UpdateModelDto<IDatabase>;

const updateDatabaseDtoSchema: SchemaConfig = { ...databaseSchema };

function validateUpdateDatabaseDto(data: any): data is UpdateDatabaseDto {
    validateUpdateModelDto(data);
    Schema.validate(data, updateDatabaseDtoSchema);
    return true;
}

export { UpdateDatabaseDto, updateDatabaseDtoSchema, validateUpdateDatabaseDto };
export default UpdateDatabaseDto;