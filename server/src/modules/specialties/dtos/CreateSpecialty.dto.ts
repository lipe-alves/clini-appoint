import Schema, { SchemaConfig } from "@root/core/Schema"
import { ISpecialty, specialtySchema } from "@root/modules/specialties/models/Specialty.model";
import CreateModelDto, { validateCreateModelDto } from "@root/shared/dtos/CreateModel.dto";

type CreateSpecialtyDto = Pick<ISpecialty, "name" | "description" | "professionalType"> & CreateModelDto<ISpecialty>;

const createSpecialtyDtoSchema: SchemaConfig = {
    name: { ...specialtySchema.name, required: false },
    description: { ...specialtySchema.description, required: false },
    professionalType: { ...specialtySchema.professionalType, required: false }
};

function validateCreateSpecialtyDto(data: any): data is CreateSpecialtyDto {
    validateCreateModelDto(data);
    Schema.validate(data, createSpecialtyDtoSchema);
    return true;
}

export { CreateSpecialtyDto, createSpecialtyDtoSchema, validateCreateSpecialtyDto };
export default CreateSpecialtyDto;