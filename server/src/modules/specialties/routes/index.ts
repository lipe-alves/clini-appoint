import { Route } from "@root/shared/types/index";
import { SpecialtiesController } from "@root/modules/specialties/controllers/index";

const routes: Route[] = [
    {
        method: "get",
        path: "/specialties",
        Controller: SpecialtiesController,
        func: "getSpecialties",
        protected: true
    },
    {
        method: "post",
        path: "/specialties",
        Controller: SpecialtiesController,
        func: "createSpecialty",
        protected: true
    }
];

export default routes;
export { routes };