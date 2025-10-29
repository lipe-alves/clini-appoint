import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import bcrypt from "bcryptjs";

import { InternalServerError, RequiredFieldError, ResourceNotFoundError } from "@root/shared/errors";
import { WrongEmailOrPassword, ForbiddenError, WeakPasswordError } from "@root/modules/auth/errors";

import { UserService } from "@root/modules/users/services/User.service";
import UserModel from "@root/modules/users/models/User.model";
import { SecureUserData } from "@root/modules/users/types";
import DatabaseService from "@root/modules/databases/services/Database.service";

import { IAccessTokenPayload, IRefreshTokenPayload } from "@root/modules/auth/types";
import RegisterUserDto from "@root/modules/auth/dtos/RegisterUser.dto";
import LoginUserDto from "@root/modules/auth/dtos/LoginUser.dto";

interface LoginResponse {
    accessToken: string; 
    refreshToken: string;
    user: SecureUserData;
}

type RefreshResponse = LoginResponse;

class AuthService {
    private readonly userService: UserService;
    private readonly databaseService: DatabaseService;
    private readonly jwtSecret: string;
    private readonly jwtRefreshSecret: string;
    private readonly tokenExpiry: StringValue;
    private readonly refreshExpiry: StringValue;

    public constructor(userService: UserService, databaseService: DatabaseService) {
        if (!process.env.JWT_SECRET) {
            throw new InternalServerError("JWT_SECRET is not defined");
        }

        if (!process.env.JWT_REFRESH_SECRET) {
            throw new InternalServerError("JWT_REFRESH_SECRET is not defined");
        }

        if (!process.env.JWT_EXPIRY) {
            throw new InternalServerError("JWT_EXPIRY is not defined");
        }

        if (!process.env.JWT_REFRESH_EXPIRY) {
            throw new InternalServerError("JWT_REFRESH_EXPIRY is not defined");
        }
      
        this.jwtSecret = process.env.JWT_SECRET;
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        this.tokenExpiry = process.env.JWT_EXPIRY as StringValue;
        this.refreshExpiry = process.env.JWT_REFRESH_EXPIRY as StringValue;

        this.userService = userService;
        this.databaseService = databaseService;
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    private async generateAccessToken(user: UserModel): Promise<string> {
        const userData = user.toSecureData();

        const payload: IAccessTokenPayload = {
            userId: user.id,
            user: userData,
            createdAt: new Date()
        };
        
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: this.tokenExpiry });
        return token;
    }

    private async generateRefreshToken(user: UserModel): Promise<string> {
        const payload: IRefreshTokenPayload = {
            userId: user.id,
            createdAt: new Date()
        };
        
        const token = jwt.sign(payload, this.jwtRefreshSecret, { expiresIn: this.refreshExpiry });
        return token;
    }

    private checkPasswordErrors(password: string): string[] {
        const errors = [];

        if (password.length < 8) {
            errors.push("Password must be at least 8 characters long.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one digit.");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character.");
        }

        return errors;
    }

    public decodeAccessToken(token: string): IAccessTokenPayload {
        try {
            return jwt.verify(token, this.jwtSecret) as IAccessTokenPayload;
        } catch {
            throw new ForbiddenError();
        }
    }

    public decodeRefreshToken(token: string): IRefreshTokenPayload {
        try {
            return jwt.verify(token, this.jwtRefreshSecret) as IRefreshTokenPayload;
        } catch {
            throw new ForbiddenError();
        }
    }

    public async refresh(refreshToken: string): Promise<RefreshResponse> {
        if (!refreshToken) throw new RequiredFieldError("refreshToken");

        const user = await this.userService.where("refreshToken", "==", refreshToken).getFirst();
        if (!user) throw new ForbiddenError();

        const decoded = this.decodeRefreshToken(refreshToken);
        if (decoded.userId !== user.id) throw new ForbiddenError();

        const newAccessToken = await this.generateAccessToken(user);
        const newRefreshToken = await this.generateRefreshToken(user);

        await this.userService.update(user.id, { refreshToken: newRefreshToken });

        return { 
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            user: user.toSecureData() 
        };
    }
  
    public async login(data: LoginUserDto): Promise<LoginResponse> {
        const user = await this.userService.getByEmail(data.database, data.email);
        if (!user) throw new WrongEmailOrPassword();
    
        const match = await this.comparePasswords(data.password, user.password);
        if (!match) throw new WrongEmailOrPassword();

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        await this.userService.update(user.id, { refreshToken });

        return { 
            accessToken,
            refreshToken,
            user: user.toSecureData() 
        };
    }

    public async logout(accessToken: string): Promise<void> {
        if (!accessToken) throw new RequiredFieldError("accessToken");
        
        const payload = this.decodeAccessToken(accessToken);
        await this.userService.update(payload.userId, { refreshToken: "" });
    }

    public async register(data: RegisterUserDto): Promise<UserModel> {
        const database = await this.databaseService.where("database", "==", data.database).getFirst();
        if (!database) throw new ResourceNotFoundError("Database", "database", data.database);

        const inputPassword = data.password;
        const pwdErrors = this.checkPasswordErrors(inputPassword);
        if (pwdErrors.length > 0) throw new WeakPasswordError(pwdErrors);

        const hashedPassword = await this.hashPassword(inputPassword);
        data.password = hashedPassword;
        
        const user = await this.userService.create(data);
        return user;
    }
}

export { AuthService };
export default AuthService;