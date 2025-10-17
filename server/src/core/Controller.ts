import { HttpRequest, HttpResponse } from "@root/shared/types/index";
import ServerError from "./ServerError";

abstract class Controller {
    protected request: HttpRequest;
    protected response: HttpResponse;

    public constructor(req: HttpRequest, res: HttpResponse) {
        this.request = req;
        this.response = res;
    }

    public abstract execute(func: string): Promise<void>;

    public success(message: string, data: Object = {})
    {
        this.response.status(200).send({
            code: "SUCCESS",
            status: this.response.statusCode,
            message,
            data
        });
    }

    public fail(err: ServerError)
    {
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

export { Controller };
export default Controller;