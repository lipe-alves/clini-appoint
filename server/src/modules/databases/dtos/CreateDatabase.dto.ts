import Schema, { SchemaConfig } from "@root/core/Schema"
import { IDatabase, databaseSchema } from "@root/modules/databases/models/Database.model";
import CreateModelDto, { validateCreateModelDto } from "@root/shared/dtos/CreateModel.dto";

type CreateDatabaseDto = CreateModelDto<IDatabase>;

const createDatabaseDtoSchema: SchemaConfig = { ...databaseSchema };

function validateCreateDatabaseDto(data: any): data is CreateDatabaseDto {
    validateCreateModelDto(data);
    Schema.validate(data, createDatabaseDtoSchema);
    return true;
}

export { CreateDatabaseDto, createDatabaseDtoSchema, validateCreateDatabaseDto };
export default CreateDatabaseDto;