import { IModel, Model } from "./Model";
import { ID, Int } from "@root/shared/types";
import Repository, { OrderByDirection, WhereFilter } from "./Repository";
import CreateModelDto from "@root/shared/dtos/CreateModel.dto";

class Service<
    T extends IModel, 
    M extends Model<T>, 
    R extends Repository<T, M>  
> {
    public readonly repository: R;

    public constructor(repository: R) {
        this.repository = repository;
    }

    public async create(data: CreateModelDto<T>): Promise<M> {
        const model = await this.repository.create(data);
        return model;
    }

    public async update(id: ID, data: Partial<T>): Promise<M | null> {
        await this.repository.update(id, data);
        const model = await this.repository.getById(id);
        return model;
    }

    public async delete(id: ID): Promise<void> {
        await this.repository.delete(id);
    }

    public where(field: string, op: WhereFilter, value: any): this {
        this.repository.where(field, op, value);
        return this;
    }

    public and(field: string, op: WhereFilter, value: any): this {
        this.repository.where(field, op, value);
        return this;
    }

    public page(size: Int, page: Int): this {
        this.repository.page(size, page);
        return this;
    }

    public orderBy(field: string, direction: OrderByDirection): this {
        this.repository.orderBy(field, direction);
        return this;
    }

    public async list(): Promise<M[]> {
        return this.repository.list();
    }
}


export { Service };
export default Service;