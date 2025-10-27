import Schema, { SchemaConfig } from "@root/core/Schema";
import CreateUserDto, { validateCreateUserDto, createUserDtoSchema } from "@root/modules/users/dtos/CreateUser.dto";

type RegisterUserDto = Omit<CreateUserDto, "refreshToken">;

const registerUserDtoSchema: SchemaConfig = {
    ...createUserDtoSchema,
    refreshToken: Schema.notAllowedField()
};

function validateRegisterUserDto(data: any): data is RegisterUserDto {
    validateCreateUserDto(data);
    Schema.validate(data, registerUserDtoSchema);
    return true;
}

export { RegisterUserDto, registerUserDtoSchema, validateRegisterUserDto };
export default RegisterUserDto;