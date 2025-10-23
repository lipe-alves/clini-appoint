import Schema, { SchemaConfig } from "@root/core/Schema"
import { ISpecialty, specialtySchema } from "@root/modules/specialties/models/Specialty.model";

type UpdateSpecialtyDto = Pick<ISpecialty, "name" | "description" | "professionalType">;

const updateSpecialtyDtoSchema: SchemaConfig = {
    name: { ...specialtySchema.name, required: false },
    description: { ...specialtySchema.description, required: false },
    professionalType: { ...specialtySchema.professionalType, required: false }
};

function validateUpdateSpecialtyDto(data: any): data is UpdateSpecialtyDto {
    Schema.validate(data, updateSpecialtyDtoSchema);
    return true;
}

export { UpdateSpecialtyDto, updateSpecialtyDtoSchema, validateUpdateSpecialtyDto };
export default UpdateSpecialtyDto;