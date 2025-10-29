import { Middleware } from "@root/core";

import AuthService from "@root/modules/auth/services/Auth.service";
import UserService from "@root/modules/users/services/User.service";
import DatabaseService from "@root/modules/databases/services/Database.service";

import { UnauthorizedError } from "@root/modules/auth/errors";

class AuthMiddleware extends Middleware {
    public async execute() {
        const userService = new UserService();
        const databaseService = new DatabaseService();
        const authService = new AuthService(userService, databaseService);

        const authHeader = this.request.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            throw new UnauthorizedError();
        }

        const [, token] = authHeader.split(" ");

        try {
            const decoded = authService.decodeAccessToken(token);
            this.request.auth = decoded;
        } catch (err) {
            throw err;
        }

    }
}

export default AuthMiddleware;
export { AuthMiddleware };