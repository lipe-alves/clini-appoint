import { Model, IModel } from "@root/core/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IDatabase extends IModel {
    description?: string;
}

const databaseSchema: SchemaConfig = {
    description: Schema.stringField(false),
};

class DatabaseModel extends Model<IDatabase> implements IDatabase {
    public constructor(data: IDatabase) {
        super(data, databaseSchema);
    }

    public get description() {
        return this.data.description;
    }

    public set description(description: string | undefined) {
        this.data.description = description;
    }
}

export { DatabaseModel, IDatabase, databaseSchema };
export default DatabaseModel;