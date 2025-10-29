import { Repository } from "@root/core/index";
import CareUnitModel, { ICareUnit } from "@root/modules/care-units/models/CareUnit.model";

class CareUnitRepository extends Repository<ICareUnit, CareUnitModel> {
    public constructor() {
        super("care-units", CareUnitModel);
    }

    public async getByName(database: string, name: string): Promise<CareUnitModel | null> {
        const [specialty = null] = await this
            .where("database", "==", database)
            .and("name", "==", name)
            .list();
        return specialty;
    }
}

export default CareUnitRepository;
export { CareUnitRepository };