import Controller from "@root/core/Controller";

import AuthService from "@root/modules/auth/services/Auth.service";
import UserService from "@root/modules/users/services/User.service";
import DatabaseService from "@root/modules/databases/services/Database.service";

import { validateLoginUserDto } from "@root/modules/auth/dtos/LoginUser.dto";
import { validateRegisterUserDto } from "@root/modules/auth/dtos/RegisterUser.dto";
import { ForbiddenError, UnauthorizedError } from "@root/modules/auth/errors";

class AuthController extends Controller {
    public async login() {
        const params = this.request.body;
        if (!validateLoginUserDto(params)) return;

        const userService = new UserService();
        const databaseService = new DatabaseService();
        const authService = new AuthService(userService, databaseService);

        const tokens = await authService.login(params);
        this.response.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        
        this.success("Logged in successfully.", { 
            accessToken: tokens.accessToken,
            user: tokens.user
        });
    }

    public async logout() {
        const headers = this.request.headers;
        if (!headers.authorization) throw new UnauthorizedError();

        const [, accessToken] = headers.authorization;
        if (!accessToken) throw new ForbiddenError();

        const userService = new UserService();
        const databaseService = new DatabaseService();
        const authService = new AuthService(userService, databaseService);

        await authService.logout(accessToken);
        this.response.cookie("refreshToken", "", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        
        this.success("Logged out successfully.");
    }

    public async register() {
        const params = this.request.body;
        if (!validateRegisterUserDto(params)) return;
        
        const userService = new UserService();
        const databaseService = new DatabaseService();
        const authService = new AuthService(userService, databaseService);

        await authService.register(params);

        this.success("User registered successfully.");
    }

    public async refresh() {
        const refreshToken = this.request.cookies.refreshToken;
        if (typeof refreshToken !== "string") throw new ForbiddenError();

        const userService = new UserService();
        const databaseService = new DatabaseService();
        const authService = new AuthService(userService, databaseService);

        const tokens = await authService.refresh(refreshToken);
        this.response.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        
        this.success("Session refreshed successfully.", { 
            accessToken: tokens.accessToken,
            user: tokens.user
        });
    }

    public async execute(func: string) {
        if (func === "login") {
            await this.login();
        }

        if (func === "logout") {
            await this.logout();
        }

        if (func === "register") {
            await this.register();
        }

        if (func === "refresh") {
            await this.refresh();
        }
    }
}

export { AuthController };
export default AuthController;