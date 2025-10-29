import  { USER_ROLES_LIST } from "@root/modules/users/constants/index";
import  { IUser } from "@root/modules/users/models/User.model";

export type UserRole = typeof USER_ROLES_LIST[number];

export type SecureUserData = Omit<IUser, "password" | "refreshToken"> & {
    password?: "" | undefined;
    refreshToken?: "" | undefined;
};