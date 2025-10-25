import Schema, { SchemaConfig } from "@root/core/Schema"
import { IUser, userSchema } from "@root/modules/users/models/User.model";
import CreateModelDto, { validateCreateModelDto } from "@root/shared/dtos/CreateModel.dto";

type CreateUserDto = CreateModelDto<IUser>;

const createUserDtoSchema: SchemaConfig = { ...userSchema };

function validateCreateSpecialtyDto(data: any): data is CreateUserDto {
    validateCreateModelDto(data);
    Schema.validate(data, createUserDtoSchema);
    return true;
}

export { CreateUserDto, createUserDtoSchema, validateCreateSpecialtyDto };
export default CreateUserDto;