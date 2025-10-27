import { Route } from "@root/shared/types/index";
import { TestsController } from "@root/modules/tests/controllers/index";

const routes: Route[] = [
    {
        method: "get",
        path: "/tests/ping",
        Controller: TestsController,
        func: "ping"
    }
];

export default routes;
export { routes };