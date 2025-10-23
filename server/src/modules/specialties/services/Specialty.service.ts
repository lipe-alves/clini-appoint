import { Service } from "@root/core/index";

import SpecialtyModel, { ISpecialty } from "@root/modules/specialties/models/Specialty.model";
import SpecialtyRepository from "@root/modules/specialties/repositories/Specialty.repository";

import CreateSpecialtyDto from "@root/modules/specialties/dtos/CreateSpecialty.dto";
import UpdateSpecialtyDto from "@root/modules/specialties/dtos/UpdateSpecialty.dto";

import { DuplicatedRegisterError, ResourceNotFoundError } from "@root/shared/errors/index";
import { ID } from "@root/shared/types";

class SpecialtyService extends Service<
    ISpecialty, 
    SpecialtyModel, 
    SpecialtyRepository,
    CreateSpecialtyDto,
    UpdateSpecialtyDto
> {
    public constructor() {
        const repository = new SpecialtyRepository();
        super(repository);
    }

    public async create(data: CreateSpecialtyDto): Promise<SpecialtyModel> {
        const model = SpecialtyModel.fromDto(data);

        const specialtySameName = await this.repository.getByName(model.name);
        const duplicated = !!specialtySameName;
        
        if (duplicated) {
            throw new DuplicatedRegisterError("Specialty", "name", model.name);
        }

        const specialty = await this.repository.create(data);
        return specialty;
    }

    public async update(id: ID, data: UpdateSpecialtyDto): Promise<SpecialtyModel> {
        await this.repository.update(id, data);

        const specialty = await this.repository.getById(id);
        if (!specialty) throw new ResourceNotFoundError("Specialty", "id", id);
        
        return specialty;
    }

    public async delete(id: ID): Promise<void> {
        const specialty = await this.repository.getById(id);
        if (!specialty) throw new ResourceNotFoundError("Specialty", "id", id);

        await this.repository.delete(id);
    }
}

export default SpecialtyService;
export { SpecialtyService };