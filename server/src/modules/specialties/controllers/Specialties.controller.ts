import Controller from "@root/core/Controller";
import { validateCreateSpecialtyDto } from "@root/modules/specialties/dtos/CreateSpecialty.dto";
import SpecialtyService from "@root/modules/specialties/services/Specialty.service";
import SpecialtyModel, { ISpecialty } from "@root/modules/specialties/models/Specialty.model";
import SpecialtyRepository from "@root/modules/specialties/repositories/Specialty.repository";
import { UnauthorizedError } from "@root/modules/auth/errors/index";

class SpecialtiesController extends Controller {
    public async createSpecialty() {
        const params = this.request.body;

        if (!validateCreateSpecialtyDto(params)) {
            return;
        }

        const service = new SpecialtyService(this.request.auth!.user.database);
        const specialty = await service.create(params);

        this.success("Specialty created successfully.", specialty);
    }

    public async getSpecialties() {
        const service = new SpecialtyService(this.request.auth!.user.database);
        await this.getModels<ISpecialty, SpecialtyModel, SpecialtyRepository>(service);
    }

    public async execute(func: string) {
        if (!this.request.auth) {
            throw new UnauthorizedError();
        }
        
        if (func === "createSpecialty") {
            await this.createSpecialty();
        }

        if (func === "getSpecialties") {
            await this.getSpecialties();
        }
    }
}

export { SpecialtiesController };
export default SpecialtiesController;