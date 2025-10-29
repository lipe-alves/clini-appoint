import express from "express";
import { Route, RouterConfigs } from "@root/shared/types/index";

class Router {
    public readonly configs: RouterConfigs;
    public readonly routes: Route[];
    public readonly router: express.Router;

    public constructor(routes: Route[], configs: RouterConfigs) {
        this.configs = configs;
        this.routes = routes;
        this.router = express.Router();
    }

    public init() {
        for (const route of this.routes) {
            if (!route.middlewares) {
                route.middlewares = [];
            }

            if (route.protected) {
                route.middlewares = [this.configs.AuthMiddleware, ...route.middlewares];
            }

            this.router[route.method](route.path, async (req, res) => {
                try {
                    for (const Middleware of route.middlewares!) {
                        const middleware = new Middleware(req, res);
                        await middleware.execute();
                    }

                    const controller = new route.Controller(req, res);
                    await controller.execute(route.func);
                } catch (err) {
                    const errMiddleware = new this.configs.ErrorMiddleware(req, res);
                    await errMiddleware.execute(err);
                }
            });
        }
    }
}

export { Router };
export default Router; 