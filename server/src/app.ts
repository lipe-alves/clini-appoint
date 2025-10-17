import express from "express";
import Router from "@root/core/Router";
import testsRoutes from "@root/modules/tests/routes/index";
import { Route } from "@root/shared/types/index";

const app = express();

app.use(express.json());

const routes: Route[] = [];
routes.push(...testsRoutes);

const router = new Router(routes);
router.init();

app.use("/web", router.router);

export default app;