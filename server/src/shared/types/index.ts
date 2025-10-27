import Controller from "@root/core/Controller";
import { GENDER_LIST } from "@root/shared/constants/index";
import * as http from "http";
import { IAccessTokenPayload } from "@root/modules/auth/types/index";

export type Opaque<T, K> = T & { __opaque__: K };

export interface CookieOptions {
    /** Convenient option for setting the expiry time relative to the current time in **milliseconds**. */
    maxAge?: number | undefined;
    /** Indicates if the cookie should be signed. */
    signed?: boolean | undefined;
    /** Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie. */
    expires?: Date | undefined;
    /** Flags the cookie to be accessible only by the web server. */
    httpOnly?: boolean | undefined;
    /** Path for the cookie. Defaults to “/”. */
    path?: string | undefined;
    /** Domain name for the cookie. Defaults to the domain name of the app. */
    domain?: string | undefined;
    /** Marks the cookie to be used with HTTPS only. */
    secure?: boolean | undefined;
    /** A synchronous function used for cookie value encoding. Defaults to encodeURIComponent. */
    encode?: ((val: string) => string) | undefined;
    /**
     * Value of the “SameSite” Set-Cookie attribute.
     * @link https://tools.ietf.org/html/draft-ietf-httpbis-cookie-same-site-00#section-4.1.1.
     */
    sameSite?: boolean | "lax" | "strict" | "none" | undefined;
    /**
     * Value of the “Priority” Set-Cookie attribute.
     * @link https://datatracker.ietf.org/doc/html/draft-west-cookie-priority-00#section-4.3
     */
    priority?: "low" | "medium" | "high";
    /** Marks the cookie to use partioned storage. */
    partitioned?: boolean | undefined;
}

export interface HttpRequest<
    TBody = {}, 
    TParams = {}, 
    TQuery = {}, 
    THeaders extends http.IncomingHttpHeaders = {
        authorization?: string;
    }
> extends http.IncomingMessage {
    cookies: { [key: string]: string | string[] | undefined };
    headers: THeaders;
    body: TBody;
    params: TParams;
    query: TQuery;
    auth?: IAccessTokenPayload;
}

export interface HttpResponse extends http.ServerResponse {
    header(field: string, value?: string | string[]): this;
    cookie(field: string, value?: string | string[], options?: CookieOptions): this;
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

export type Gender = typeof GENDER_LIST[number];
export type Int = Opaque<number, "Int">;
export type ID = Opaque<`${Int}`, "ID">;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
