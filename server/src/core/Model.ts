import { ID } from "@root/shared/types/index";
import { toDate } from "@root/shared/utils/date";
import { Schema, SchemaConfig } from "./index";
import { generateId } from "@root/shared/utils/index";
import CreateModelDto from "@root/shared/dtos/CreateModel.dto";

interface IModel {
    id: ID;
    createdAt: Date;
    updatedAt: Date;
    metadata: Record<string, any>;
}

const modelSchema: SchemaConfig = {
    id: Schema.idField(true),
    createdAt: Schema.dateField(true),
    updatedAt: Schema.dateField(true),
    metadata: Schema.objectField(true),
};

class Model<T extends IModel> implements IModel {
    protected readonly data: T;
    protected readonly schema: SchemaConfig;

    public constructor(data: T, schema = modelSchema) {
        this.schema = { ...schema, ...modelSchema };
        const parsed = this.parse(data);
        this.data = new Proxy(parsed, {
            set: (target, prop, value) => {
                target[prop as keyof T] = value;
                this.validate();
                return true;
            },
        });

        this.validate();
    }

    public get id() {
        return this.data.id;
    }

    public set id(id: ID) {
        this.data.id = id;
    }

    public get createdAt() {
        return this.data.createdAt;
    }

    public set createdAt(date: Date) {
        this.data.createdAt = date;
    }

    public get updatedAt() {
        return this.data.updatedAt;
    }

    public set updatedAt(date: Date) {
        this.data.updatedAt = date;
    }

    public get metadata() {
        return this.data.metadata;
    }

    public set metadata(metadata: Record<string, any>) {
        this.data.metadata = metadata;
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

    public toString(): string {
        return JSON.stringify(this.data);
    }

    public static fromDto<T extends IModel, U extends Model<T>>(
        this: new (data: T) => U,
        dto: CreateModelDto<T>,
    ): U {
        const now = new Date();
        const data = {
            ...dto,
            id: dto.id || generateId(),
            createdAt: dto.createdAt || now,
            updatedAt: dto.updatedAt || now,
            metadata: dto.metadata || {},
        } as T;
        return new this(data);
    }
}

export { Model, IModel, modelSchema };
export default Model;
