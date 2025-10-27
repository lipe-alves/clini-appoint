import { Model, IModel } from "@root/core/index";
import { UserRole } from "@root/modules/users/types/index";
import { USER_ROLES_LIST } from "@root/modules/users/constants/index";
import { GENDER_LIST } from "@root/shared/constants/index";
import { Gender } from "@root/shared/types/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IUser extends IModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    birthdate?: Date;
    gender?: Gender;
    role: UserRole;
    database: string;
    refreshToken?: string;
}

const userSchema: SchemaConfig = {
    firstName: Schema.stringField(true),
    lastName: Schema.stringField(true),
    email: Schema.emailField(true),
    password: Schema.stringField(true),
    phone: Schema.cellphoneField(false),
    birthdate: Schema.dateField(false),
    gender: Schema.enumField([...GENDER_LIST], false),
    role: Schema.enumField([...USER_ROLES_LIST], true),
    database: Schema.stringField(true),
    refreshToken: Schema.stringField(false)
};

class UserModel extends Model<IUser> implements IUser {
    public constructor(data: IUser) {
        super(data, userSchema);
    }

    protected parse(data: any): IUser {
        data = super.parse(data);
        data.birthdate = data.birthdate ? new Date(data.birthdate) : undefined;
        return data;
    }

    public get firstName() {
        return this.data.firstName;
    }

    public set firstName(firstName: string) {
        this.data.firstName = firstName;
    }

    public get lastName() {
        return this.data.lastName;
    }

    public set lastName(lastName: string) {
        this.data.lastName = lastName;
    }

    public get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    public get email() {
        return this.data.email;
    }

    public set email(email: string) {
        this.data.email = email;
    }

    public get password() {
        return this.data.password;
    }

    public set password(password: string) {
        this.data.password = password;
    }

    public get phone() {
        return this.data.phone;
    }

    public set phone(phone: string | undefined) {
        this.data.phone = phone;
    }

    public get birthdate() {
        return this.data.birthdate;
    }

    public set birthdate(birthdate: Date | undefined) {
        this.data.birthdate = birthdate;
    }

    public get gender() {
        return this.data.gender;
    }

    public set gender(gender: Gender | undefined) {
        this.data.gender = gender;
    }

    public get role() {
        return this.data.role;
    }

    public set role(role: UserRole) {
        this.data.role = role;
    }

    public get database() {
        return this.data.database;
    }

    public get refreshToken() {
        return this.data.refreshToken;
    }

    public set refreshToken(refreshToken: string | undefined) {
        this.data.refreshToken = refreshToken;
    }

    public set database(database: string) {
        this.data.database = database;
    }
}

export { UserModel, IUser, userSchema };
export default UserModel;