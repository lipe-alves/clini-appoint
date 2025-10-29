import Schema, { SchemaConfig } from "@root/core/Schema"
import { IModel, modelSchema } from "@root/core/Model";

type UpdateModelDto<T extends IModel = IModel> = Omit<T, "id" | "createdAt" | "updatedAt">;

const updateModelDtoSchema: SchemaConfig = {
    id: Schema.notAllowedField(),
    createdAt: Schema.notAllowedField(),
    updatedAt: Schema.notAllowedField(),
    metadata: { ...modelSchema.metadata, required: false }
};

function validateUpdateModelDto(data: any): data is UpdateModelDto {
    Schema.validate(data, updateModelDtoSchema);
    return true;
}

export { UpdateModelDto, updateModelDtoSchema, validateUpdateModelDto };
export default UpdateModelDto;