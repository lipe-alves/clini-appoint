import Controller from "@root/core/Controller";

import DatabaseService from "@root/modules/databases/services/Database.service";
import { validateCreateDatabaseDto } from "@root/modules/databases/dtos/CreateDatabase.dto";
import DatabaseModel, { IDatabase } from "@root/modules/databases/models/Database.model";
import DatabaseRepository from "@root/modules/databases/repositories/Database.repository";

import { UnauthorizedError } from "@root/modules/auth/errors";

class DatabaseController extends Controller {
    public async getDatabases() {
        const service = new DatabaseService();
        const items = await this.getModels<IDatabase, DatabaseModel, DatabaseRepository>(service);
        this.success("Consulta realizada com sucesso.", { items });
    }
    
    public async createDatabase() {
        const params = this.request.body;
        if (!validateCreateDatabaseDto(params)) return;

        const user = this.request.auth!.user;
        if (user.role !== "admin" && user.role !== "dev") {
            throw new UnauthorizedError();
        }

        const databaseService = new DatabaseService();
        const database = await databaseService.create(params);
        
        this.success("Database created successfully.", { database: database.toJson() });
    }

    public async execute(func: string) {
        if (!this.request.auth) {
            throw new UnauthorizedError();
        }

        if (func === "getDatabases") {
            await this.getDatabases();
        }

        if (func === "createDatabase") {
            await this.createDatabase();
        }
    }
}

export { DatabaseController };
export default DatabaseController;