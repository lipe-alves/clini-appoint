import Controller from "@root/core/Controller";
import { validateCreateSpecialtyDto } from "@root/modules/specialties/dtos/CreateSpecialty.dto";
import SpecialtyService from "@root/modules/specialties/services/Specialty.service";
import SpecialtyModel, { ISpecialty } from "@root/modules/specialties/models/Specialty.model";
import SpecialtyRepository from "@root/modules/specialties/repositories/Specialty.repository";

class SpecialtiesController extends Controller {
    public async createSpecialty() {
        const params = this.request.body;

        if (!validateCreateSpecialtyDto(params)) {
            return;
        }

        const service = new SpecialtyService();
        const specialty = await service.create(params);

        this.success("Specialty created successfully.", specialty);
    }

    public async getSpecialties() {
        const service = new SpecialtyService();
        await this.getModels<ISpecialty, SpecialtyModel, SpecialtyRepository>(service);
    }

    public async execute(func: string) {
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