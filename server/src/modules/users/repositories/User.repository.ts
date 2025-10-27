import  { UserModel, IUser } from "@root/modules/users/models/User.model";
import { Repository } from "@root/core/index";

class UserRepository extends Repository<IUser, UserModel> {
    protected readonly database: string;
    
    public constructor() {
        super("users", UserModel);
        this.database = "clients";
    }
}

export { UserRepository };
export default UserRepository;