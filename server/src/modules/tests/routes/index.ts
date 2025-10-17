import { Route } from "@root/shared/types/index";
import { TestsController } from "@root/modules/tests/controllers/index";

const testsRoutes: Route[] = [
    {
        method: "get",
        path: "/tests/ping",
        Controller: TestsController,
        func: "ping"
    }
];

export default testsRoutes;
export { testsRoutes };