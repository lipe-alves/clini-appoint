import { ID } from "@root/shared/types";
import { IUser } from "@root/modules/users/models/User.model";

export interface IAccessTokenPayload {
    userId: ID;
    user: Omit<IUser, "id" | "password" | "refreshToken">;
    createdAt: Date
}

export interface IRefreshTokenPayload {
    userId: ID;
    createdAt: Date;
}