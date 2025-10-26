import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { InternalServerError, ResourceNotFoundError } from "@root/shared/errors";
import { UserService } from "@root/modules/users/services/User.service";
import { IUser } from "@root/modules/users/models/User.model";
import { ID } from "@root/shared/types";

interface ITokenPayload {
    userId: ID;
    user: Omit<IUser, "id" | "password">;
    createdAt: Date
}

class AuthService {
    private readonly userService: UserService;
    private readonly jwtSecret: string;
    private readonly tokenExpiry: string;

    public constructor(userService: UserService) {
        if (!process.env.JWT_SECRET) {
            throw new InternalServerError("JWT_SECRET is not defined");
        }

        if (!process.env.JWT_EXPIRY) {
            throw new InternalServerError("JWT_EXPIRY is not defined");
        }
      
        this.jwtSecret = process.env.JWT_SECRET;
        this.tokenExpiry = process.env.JWT_EXPIRY;
        this.userService = userService;
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    private async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    private decodeToken(token: string): ITokenPayload  {
        return jwt.verify(token, this.jwtSecret) as ITokenPayload;
    }

    private async generateToken(userId: ID): string {
        const user = await this.userService.getById(userId);
        if (!user) throw new ResourceNotFoundError("User", userId, "id");

        const userData = { ...user.toJson() } as any;
        delete userData.password;
        delete userData.id;

        const payload: ITokenPayload = {
            userId: user.id,
            user: userData,
            createdAt: new Date()
        };
        
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: this.tokenExpiry });

        return token;
    }
  
    public async login() {
      
    }
}

export { AuthService };
export default AuthService;