import { ID } from "@root/shared/types/index";
import { toDate } from "@root/shared/utils/date";
import { Schema, SchemaConfig } from "@root/shared/utils/schema";

interface IModel {
    id: ID;
    createdAt: Date;
    updatedAt: Date;
    metadata: Record<string, any>;
}

const baseModelSchema: SchemaConfig = {
    id: Schema.idField(true),
    createdAt: Schema.dateField(true),
    updatedAt: Schema.dateField(true),
    metadata: Schema.objectField(true)
};

class Model<T extends IModel> implements IModel {
    protected readonly data: T;
    protected readonly schema: SchemaConfig;
    
    public constructor(data: T, schema = baseModelSchema) {
        this.schema = { ...schema, ...baseModelSchema };
        this.data = this.parse(data);
        this.validate();
    }

    public get id() {
        return this.data.id;
    }

    public get createdAt() {
        return this.data.createdAt;
    }

    public get updatedAt() {
        return this.data.updatedAt;
    }

    public get metadata() {
        return this.data.metadata;
    }

    protected parse(data: any): T {
        data.createdAt = toDate(data.createdAt);
        data.updatedAt = toDate(data.updatedAt);
        return data;
    }

    protected validate(): void {
        Schema.validate(this.data, this.schema);
    }
    
    public toJson(): T {
        return this.data;
    } 
}

export { Model, IModel };
export default Model;