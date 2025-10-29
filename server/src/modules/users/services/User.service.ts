import { UserRepository } from "@root/modules/users/repositories/User.repository";
import { UserModel, IUser } from "@root/modules/users/models/User.model";
import { Service } from "@root/core/index";
import CreateUserDto from "@root/modules/users/dtos/CreateUser.dto";
import { DuplicatedRegisterError } from "@root/shared/errors/index";

class UserService extends Service<IUser, UserModel, UserRepository> {
    public constructor() {
        super(new UserRepository());
    }

    public async getByEmail(database: string, email: string): Promise<UserModel | null> {
        const [user = null] = await this.repository
            .where("database", "==", database)
            .and("email", "==", email)
            .list();
        return user;
    }

    public async getByPhone(database: string, phone: string): Promise<UserModel | null> {
        const [user = null] = await this.repository
            .where("database", "==", database)
            .and("phone", "==", phone)
            .list();
        return user;
    }

    public async create(data: CreateUserDto): Promise<UserModel> {
        const model = UserModel.fromDto(data);

        const userSameEmail = await this.getByEmail(model.database, model.email);
        if (userSameEmail) throw new DuplicatedRegisterError("User", "email", model.email);

        if (model.phone) {
            const userSamePhone = await this.getByPhone(model.database, model.phone);
            if (userSamePhone) throw new DuplicatedRegisterError("User", "phone", model.phone);
        }

        model.email = model.email.toLowerCase();
        
        const user = await this.repository.create(model.toJson());
        return user;
    }
}

export { UserService };
export default UserService;