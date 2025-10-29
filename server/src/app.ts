import express from "express";
import cookieParser from "cookie-parser";

import testsRoutes from "@root/modules/tests/routes/index";
import authRoutes from "@root/modules/auth/routes/index";
import databaseRoutes from "@root/modules/databases/routes/index";
import specialtiesRoutes from "@root/modules/specialties/routes/index";

import AuthMiddleware from "@root/modules/auth/middlewares/Auth.middleware";
import ErrorMiddleware from "@root/shared/middlewares/Error.middleware";

import Router from "@root/core/Router";
import { Route } from "@root/shared/types/index";

const app = express();

app.use(cookieParser());
app.use(express.json());

const routes: Route[] = [
    ...testsRoutes,
    ...authRoutes,
    ...databaseRoutes,
    ...specialtiesRoutes
];

const router = new Router(routes, {
    AuthMiddleware,
    ErrorMiddleware
});

router.init();

app.use("/v1", router.router);

export default app;