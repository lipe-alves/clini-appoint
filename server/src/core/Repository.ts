import * as admin from "firebase-admin";
import Model, { IModel } from "./Model";
import { ID, Int } from "@root/shared/types/index";
import { generateId } from "@root/shared/utils/index";
import CreateModelDto from "@root/shared/dtos/CreateModel.dto";
import { firestore } from "@root/configs/firebase";

const WHERE_FILTERS = ["<", "<=", "==", "!=", ">=", ">", "array-contains", "in", "not-in", "array-contains-any"] as const;
const ORDER_BY_DIRECTIONS = ["desc", "asc"] as const;

type WhereFilter = typeof WHERE_FILTERS[number];
type OrderByDirection = typeof ORDER_BY_DIRECTIONS[number];

class Repository<T extends IModel, M extends Model<T>> {
    public readonly dataset: string;
    private readonly database: admin.firestore.Firestore;
    private readonly collection: admin.firestore.CollectionReference;
    private query: admin.firestore.Query;
    protected readonly Model: new (data: T) => M;
    protected pageSize?: Int;
    protected pageNum?: Int;

    public constructor(dataset: string, Model: new (data: T) => M) {
        this.database = firestore;
        this.dataset = dataset;
        this.collection = this.database.collection(this.dataset);
        this.query = this.collection;
        this.Model = Model;
    }

    public async create(data: CreateModelDto<T>): Promise<M> {
        const id = data.id || generateId();
        const now = new Date();
        const modelParams = {
            ...data,
            id,
            createdAt: data.createdAt || now,
            updatedAt: data.updatedAt || now,
            metadata: data.metadata || {}
        } as T;

        const model = new this.Model(modelParams);
        await this.collection.doc(id).set(model.toJson());
        this.reset();

        return model;
    }

    public async update(id: ID, data: Partial<T>): Promise<void> {
        data.id = id;
        data.updatedAt = new Date();
        await this.collection.doc(id).update(data);
        this.reset();
    }

    public async delete(id: ID): Promise<void> {
        await this.collection.doc(id).delete();
        this.reset();
    }

    public where(field: string, op: WhereFilter, value: any): this {
        this.query = this.query.where(field, op, value);
        return this;
    }

    public and(field: string, op: WhereFilter, value: any): this {
        return this.where(field, op, value);
    }

    public orderBy(field: string, direction: OrderByDirection = "asc"): this {
        this.query = this.query.orderBy(field, direction);
        return this;
    }

    public limit(n: Int): this {
        this.query = this.query.limit(n);
        return this;
    }

    public startAfter(field: any): this {
        this.query = this.query.startAfter(field);
        return this;
    }

    public startAt(field: any): this {
        this.query = this.query.startAt(field);
        return this;
    }

    public endAt(field: any): this {
        this.query = this.query.endAt(field);
        return this;
    }

    public endBefore(field: any): this {
        this.query = this.query.endBefore(field);
        return this;
    }

    public page(size: Int, num: Int): this {
        this.pageSize = Math.max(size, 1) as Int;
        this.pageNum = Math.max(num, 1) as Int;
        this.limit(this.pageSize * this.pageNum as Int);
        return this;
    }

    public reset() {
        this.pageNum = undefined;
        this.pageSize = undefined;
        this.query = this.collection;
    }

    public async list(): Promise<M[]> {
        const snapshot = await this.query.get();

        let items = snapshot.docs.map(doc => {
            const data = doc.data() as T;
            const model = new this.Model(data);
            return model;
        });

        if (this.pageNum && this.pageSize) {
            const offset = (this.pageNum - 1)*this.pageSize;
            items = items.slice(offset, this.pageSize);
        }

        this.reset();
        
        return items;
    }

    public async getById(id: ID): Promise<M | null> {
        const doc = await this.collection.doc(id).get();
        const data = doc.exists ? (doc.data() as T) : null;
        this.reset();
        
        if (data) {
            const model = new this.Model(data);
            return model;
        }
        
        return data;
    }

    public async getFirst(): Promise<M | null> {
        const [item = null] = await this.list();
        return item;
    }
}

export { Repository, WhereFilter, OrderByDirection, WHERE_FILTERS, ORDER_BY_DIRECTIONS };
export default Repository;