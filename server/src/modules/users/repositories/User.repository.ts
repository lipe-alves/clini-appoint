import  { UserModel, IUser } from "@root/modules/users/models/User.model";
import { Repository } from "@root/core/index";

class UserRepository extends Repository<IUser, UserModel> {
    public constructor() {
        super("users", (data) => new UserModel(data));
    }
}

export { UserRepository };
export default UserRepository;