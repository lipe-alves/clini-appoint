import Controller from "@root/core/Controller";
import * as http from "http";

export type Opaque<T, K> = T & { __opaque__: K };

export interface HttpRequest<
    TBody = {}, 
    TParams = {}, 
    TQuery = {}, 
    THeaders extends http.IncomingHttpHeaders = {}
> extends http.IncomingMessage {
    headers: THeaders;
    body: TBody;
    params: TParams;
    query: TQuery;
}

export interface HttpResponse extends http.ServerResponse {
    header(field: string, value?: string | string[]): this;
    status(statusCode: number): this;
    send(body: any): this;
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
export type RouteHandler = (req: HttpRequest, res: HttpResponse) => Promise<void>;

export interface Route<TController extends Controller = Controller> {
    path: string;
    method: HttpMethod;
    Controller: new (req: HttpRequest, res: HttpResponse) => TController;
    func: string;
}

export type Gender = "Male" | "Female" | "NonBinary" | "Other";
export type Int = Opaque<number, "Int">;
export type ID = Opaque<`${Int}`, "ID">;