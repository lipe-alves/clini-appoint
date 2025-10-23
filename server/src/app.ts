import express from "express";
import Router from "@root/core/Router";
import testsRoutes from "@root/modules/tests/routes/index";
import specialtiesRoutes from "@root/modules/specialties/routes/index";
import { Route } from "@root/shared/types/index";

const app = express();

app.use(express.json());

const routes: Route[] = [];

routes.push(...testsRoutes);
routes.push(...specialtiesRoutes);

const router = new Router(routes);
router.init();

app.use("/v1", router.router);

export default app;