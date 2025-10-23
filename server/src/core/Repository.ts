import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";
import Model, { IModel } from "./Model";
import { ID, Int } from "@root/shared/types/index";
import { generateId } from "@root/shared/utils/index";
import CreateModelDto from "@root/shared/dtos/CreateModel.dto";

const serviceAccount: admin.ServiceAccount = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../configs/service-account.json"), "utf-8")
);
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = app.firestore();
firestore.settings({
    ignoreUndefinedProperties: true
});

const WHERE_FILTERS = ["<", "<=", "==", "!=", ">=", ">", "array-contains", "in", "not-in", "array-contains-any"] as const;
const ORDER_BY_DIRECTIONS = ["desc", "asc"] as const;

type WhereFilter = typeof WHERE_FILTERS[number];
type OrderByDirection = typeof ORDER_BY_DIRECTIONS[number];

class Repository<T extends IModel, M extends Model<T>> {
    public readonly dataset: string;
    public readonly createModel: (data: T) => M;
    private readonly db: admin.firestore.Firestore;
    private readonly collection: admin.firestore.CollectionReference;
    private query: admin.firestore.Query;
    private pageSize?: Int;
    private pageNum?: Int;

    public constructor(dataset: string, createModel: (data: T) => M) {
        this.db = firestore;
        this.dataset = dataset;
        this.collection = this.db.collection(this.dataset);
        this.query = this.collection;
        this.createModel = createModel;
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

        const model = this.createModel(modelParams);
        await this.collection.doc(id).set(model.toJson());

        return model;
    }

    public async update(id: ID, data: Partial<T>): Promise<void> {
        data.id = id;
        data.updatedAt = new Date();
        await this.collection.doc(id).update(data);
    }

    public async delete(id: ID): Promise<void> {
        await this.collection.doc(id).delete();
    }

    public where(field: string, op: WhereFilter, value: any): this {
        this.query = this.query.where(field, op, value);
        return this;
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
        const snapshot = await this.collection.get();
        
        let items = snapshot.docs.map(doc => {
            const data = doc.data() as T;
            const model = this.createModel(data);
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
        
        if (data) {
            const model = this.createModel(data);
            return model;
        }

        return data;
    }
}

export { Repository, WhereFilter, OrderByDirection, WHERE_FILTERS, ORDER_BY_DIRECTIONS };
export default Repository;