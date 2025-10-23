import express from "express";
import { Route } from "@root/shared/types/index";
import ServerError from "./ServerError";

class Router {
    public readonly routes: Route[];
    public readonly router: express.Router;

    public constructor(routes: Route[]) {
        this.routes = routes;
        this.router = express.Router();
    }

    public init() {
        for (const route of this.routes) {
            this.router[route.method](route.path, async (req, res) => {
                const controller = new route.Controller(req, res);
                
                try {
                    await controller.execute(route.func);
                } catch (err) {
                    let serverErr: ServerError; 
                    
                    if (!(err instanceof ServerError)) {    
                        serverErr = ServerError.create(err);
                    } else {
                        serverErr = err;
                    }
                    
                    controller.fail(serverErr);
                }
            });
        }
    }
}

export { Router };
export default Router; 