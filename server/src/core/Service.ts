import { IModel, Model } from "./Model";
import Repository from "./Repository";
import { ID } from "@root/shared/types";

abstract class Service<
    T extends IModel, 
    M extends Model<T>, 
    R extends Repository<T, M>,
    C = any,
    U = any    
> {
    public readonly repository: R;

    public constructor(repository: R) {
        this.repository = repository;
    }

    public abstract create(data: C): Promise<M>;
    public abstract update(id: ID, data: U): Promise<M>;
    public abstract delete(id: ID): Promise<void>;
}


export { Service };
export default Service;