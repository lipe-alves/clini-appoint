import { Route } from "@root/shared/types/index";
import { AuthController } from "@root/modules/auth/controllers/index";

const routes: Route[] = [
    {
        method: "post",
        path: "/auth/login",
        Controller: AuthController,
        func: "login"
    },
    {
        method: "post",
        path: "/auth/logout",
        Controller: AuthController,
        func: "logout"
    },
    {
        method: "post",
        path: "/auth/register",
        Controller: AuthController,
        func: "register"
    },
    {
        method: "post",
        path: "/auth/refresh",
        Controller: AuthController,
        func: "refresh"
    }
];

export default routes;
export { routes };