interface IModel {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

abstract class Model<T extends IModel> implements IModel {
    public readonly data: T;
    
    public constructor(data: T) {
        this.data = data;
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

    public abstract validate(): boolean;
    
    public toJson(): T {
        return this.data;
    } 
}

export { Model, IModel };
export default Model;