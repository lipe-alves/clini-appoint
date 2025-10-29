import { Middleware, ServerError } from "@root/core";
import { UnknownError } from "../errors";

class ErrorMiddleware extends Middleware {
    public async execute(err?: any) {
        let serverErr: ServerError; 
                    
        if (!(err instanceof ServerError)) {
            serverErr = ServerError.create(err);
        } else if (err) {
            serverErr = err;
        } else {
            serverErr = new UnknownError();
        }

        this.fail(serverErr);
    }
}

export default ErrorMiddleware;
export { ErrorMiddleware };

