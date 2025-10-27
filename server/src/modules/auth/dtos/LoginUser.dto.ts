import { Schema, SchemaConfig } from "@root/core";

interface LoginUserDto {
    email: string;
    password: string;
}

const loginUserDtoSchema: SchemaConfig = {
    email: Schema.emailField(true),
    password: Schema.stringField(true)
};

function validateLoginUserDto(data: any): data is LoginUserDto {
    Schema.validate(data, loginUserDtoSchema);
    return true;
}

export { LoginUserDto, loginUserDtoSchema, validateLoginUserDto };
export default LoginUserDto;