import { Schema, SchemaConfig } from "@root/core";

interface LoginUserDto {
    database: string;
    email: string;
    password: string;
}

const loginUserDtoSchema: SchemaConfig = {
    database: Schema.stringField(true),
    email: Schema.emailField(true),
    password: Schema.stringField(true)
};

function validateLoginUserDto(data: any): data is LoginUserDto {
    Schema.validate(data, loginUserDtoSchema);
    return true;
}

export { LoginUserDto, loginUserDtoSchema, validateLoginUserDto };
export default LoginUserDto;