import { HttpRequest, HttpResponse } from "@root/shared/types/index";
import { validateQueryModelsDto } from "@root/shared/dtos/QueryModels.dto";
import ServerError from "./ServerError";
import Service from "./Service";
import Model, { IModel } from "./Model";
import Repository from "./Repository";

abstract class Controller {
    protected request: HttpRequest;
    protected response: HttpResponse;

    public constructor(req: HttpRequest, res: HttpResponse) {
        this.request = req;
        this.response = res;
    }

    public abstract execute(func: string): Promise<void>;

    protected async getModels<T extends IModel, M extends Model<T>, R extends Repository<T, M>>(service: Service<T, M, R>): Promise<T[]> {
        const params = this.request.query;

        if (!validateQueryModelsDto(params)) {
            return [];
        }

        service.where("database", "==", this.request.auth!.user.database);

        for (const filter of params.filters) {
            service.where(filter.field, filter.op, filter.value);
        }
        
        const items = await service
            .page(params.pagination.size, params.pagination.page)
            .orderBy(params.order.field, params.order.direction)
            .list();

        return items.map(item => item.toJson());
    } 

    public success(message: string, data: Object = {}) {
        this.response.status(200).send({
            code: "SUCCESS",
            status: this.response.statusCode,
            message,
            data
        });
    }

    public fail(err: ServerError) {
        this.response.status(err.status).send({
            code: err.code,
            status: err.status,
            message: err.message,
            data: {
                ...err.data,
                stack: err.stack
            }
        });
    }
}

abstract class Middleware extends Controller {
    public abstract execute(err?: any): Promise<void>;
}

export { Controller, Middleware };
export default Controller;