import { ID } from "@root/shared/types";
import { SecureUserData } from "@root/modules/users/types";

export interface IAccessTokenPayload {
    userId: ID;
    user: SecureUserData;
    createdAt: Date
}

export interface IRefreshTokenPayload {
    userId: ID;
    createdAt: Date;
}