import { ID } from "@root/shared/types";
import { IUser } from "@root/modules/users/models/User.model";

export interface ITokenPayload {
    userId: ID;
    user: Omit<IUser, "id" | "password">;
    createdAt: Date
}