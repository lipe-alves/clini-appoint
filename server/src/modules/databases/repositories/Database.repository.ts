import { Repository } from "@root/core/index";
import DatabaseModel, { IDatabase } from "@root/modules/databases/models/Database.model";

class DatabaseRepository extends Repository<IDatabase, DatabaseModel> {
    public constructor() {
        super("databases", DatabaseModel);
    }

    public async getByName(name: string): Promise<DatabaseModel | null> {
        const [specialty = null] = await this
            .where("database", "==", name)
            .list();
        return specialty;
    }
}

export default DatabaseRepository;
export { DatabaseRepository };