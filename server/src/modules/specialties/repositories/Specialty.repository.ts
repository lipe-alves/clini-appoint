import { Repository } from "@root/core/index";
import SpecialtyModel, { ISpecialty } from "@root/modules/specialties/models/Specialty.model";

class SpecialtyRepository extends Repository<ISpecialty, SpecialtyModel> {
    public constructor() {
        super("specialties", (data) => new SpecialtyModel(data));
    }

    public async getByName(name: string): Promise<SpecialtyModel | null> {
        const [specialty = null] = await this
            .where("name", "==", name)
            .list();
        return specialty;
    }
}

export default SpecialtyRepository;
export { SpecialtyRepository };