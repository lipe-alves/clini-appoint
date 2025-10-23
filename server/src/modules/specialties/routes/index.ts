import { Route } from "@root/shared/types/index";
import { SpecialtiesController } from "@root/modules/specialties/controllers/index";

const testsRoutes: Route[] = [
    {
        method: "get",
        path: "/specialties",
        Controller: SpecialtiesController,
        func: "getSpecialties"
    },
    {
        method: "post",
        path: "/specialties",
        Controller: SpecialtiesController,
        func: "createSpecialty"
    }
];

export default testsRoutes;
export { testsRoutes };