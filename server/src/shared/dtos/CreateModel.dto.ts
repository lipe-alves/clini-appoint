import Schema, { SchemaConfig } from "@root/core/Schema"
import { IModel, modelSchema } from "@root/core/Model";
import { Optional } from "@root/shared/types/index";

type CreateModelDto<T extends IModel = IModel> = Optional<T, "id" | "createdAt" | "updatedAt" | "metadata">;

const createModelDtoSchema: SchemaConfig = {
    id: { ...modelSchema.id, required: false },
    createdAt: { ...modelSchema.createdAt, required: false },
    updatedAt: { ...modelSchema.updatedAt, required: false },
    metadata: { ...modelSchema.metadata, required: false }
};

function validateCreateModelDto(data: any): data is CreateModelDto {
    Schema.validate(data, createModelDtoSchema);
    return true;
}

export { CreateModelDto, createModelDtoSchema, validateCreateModelDto };
export default CreateModelDto;