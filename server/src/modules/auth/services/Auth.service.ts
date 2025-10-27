import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import bcrypt from "bcryptjs";

import { InternalServerError, RequiredFieldError } from "@root/shared/errors";
import { WrongEmailOrPassword, ForbiddenError } from "@root/modules/auth/errors";

import { UserService } from "@root/modules/users/services/User.service";
import UserModel from "@root/modules/users/models/User.model";

import { IAccessTokenPayload, IRefreshTokenPayload } from "@root/modules/auth/types";
import RegisterUserDto from "@root/modules/auth/dtos/RegisterUser.dto";
import LoginUserDto from "@root/modules/auth/dtos/LoginUser.dto";

class AuthService {
    private readonly userService: UserService;
    private readonly jwtSecret: string;
    private readonly jwtRefreshSecret: string;
    private readonly tokenExpiry: StringValue;
    private readonly refreshExpiry: StringValue;

    public constructor(userService: UserService) {
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
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    private async generateAccessToken(user: UserModel): Promise<string> {
        const userData = { ...user.toJson() } as any;

        delete userData.password;
        delete userData.id;
        delete userData.refreshToken;

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

    public decodeToken<T = IAccessTokenPayload>(token: string): T  {
        try {
            return jwt.verify(token, this.jwtSecret) as T;
        } catch {
            throw new ForbiddenError();
        }
    }

    public async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        if (!refreshToken) throw new RequiredFieldError("refreshToken");

        const user = await this.userService.where("refreshToken", "==", refreshToken).getFirst();
        if (!user) throw new ForbiddenError();

        const decoded = this.decodeToken<IRefreshTokenPayload>(refreshToken);
        if (decoded.userId !== user.id) throw new ForbiddenError();

        const newAccessToken = await this.generateAccessToken(user);
        const newRefreshToken = await this.generateRefreshToken(user);

        await this.userService.update(user.id, { refreshToken: newRefreshToken });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
  
    public async login(data: LoginUserDto): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userService.getByEmail(data.email);
        if (!user) throw new WrongEmailOrPassword();
    
        const match = await this.comparePasswords(data.password, user.password);
        if (!match) throw new WrongEmailOrPassword();

        const accessToken = await this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user);

        await this.userService.update(user.id, { refreshToken });

        return { accessToken, refreshToken };
    }

    public async logout(accessToken: string): Promise<void> {
        if (!accessToken) throw new RequiredFieldError("accessToken");
        
        const payload = this.decodeToken<IAccessTokenPayload>(accessToken);
        await this.userService.update(payload.userId, { refreshToken: "" });
    }

    public async register(data: RegisterUserDto): Promise<UserModel> {
        const inputPassword = data.password;
        const hashedPassword = await this.hashPassword(inputPassword);
        data.password = hashedPassword;
        
        const user = await this.userService.create(data);
        return user;
    }
}

export { AuthService };
export default AuthService;