import { Route } from "@root/shared/types/index";
import { DatabaseController } from "@root/modules/databases/controllers/index";

const routes: Route[] = [
    {
        method: "get",
        path: "/databases",
        Controller: DatabaseController,
        func: "getDatabases",
        protected: true
    },
    {
        method: "post",
        path: "/databases",
        Controller: DatabaseController,
        func: "createDatabase",
        protected: true
    }
];

export default routes;
export { routes };