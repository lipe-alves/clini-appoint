import { Service } from "@root/core/index";

import DatabaseModel, { IDatabase } from "@root/modules/databases/models/Database.model";
import DatabaseRepository from "@root/modules/databases/repositories/Database.repository";

import CreateDatabaseDto from "@root/modules/databases/dtos/CreateDatabase.dto";
import UpdateDatabaseDto from "@root/modules/databases/dtos/UpdateDatabase.dto";

import { DuplicatedRegisterError, ResourceNotFoundError } from "@root/shared/errors/index";
import { ID } from "@root/shared/types";

class DatabaseService extends Service<
    IDatabase, 
    DatabaseModel, 
    DatabaseRepository
> {
    public constructor() {
        const repository = new DatabaseRepository();
        super(repository);
    }

    public async create(data: CreateDatabaseDto): Promise<DatabaseModel> {
        const model = DatabaseModel.fromDto(data);

        const databaseSameName = await this.repository.getByName(model.database);
        const duplicated = !!databaseSameName;
        
        if (duplicated) throw new DuplicatedRegisterError("Database", "database", model.database);

        const database = await this.repository.create(data);
        return database;
    }

    public async update(id: ID, data: UpdateDatabaseDto): Promise<DatabaseModel> {
        await this.repository.update(id, data);

        const database = await this.repository.getById(id);
        if (!database) throw new ResourceNotFoundError("Database", "id", id);
        
        return database;
    }

    public async delete(id: ID): Promise<void> {
        const database = await this.repository.getById(id);
        if (!database) throw new ResourceNotFoundError("Database", "id", id);

        await this.repository.delete(id);
    }
}

export default DatabaseService;
export { DatabaseService };