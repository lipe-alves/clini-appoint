import { Service } from "@root/core";
import CareUnitModel, { ICareUnit } from "@root/modules/care-units/models/CareUnit.model";
import CareUnitRepository from "@root/modules/care-units/repositories/CareUnit.repository";

class CareUnitService extends Service<ICareUnit, CareUnitModel, CareUnitRepository> {
    public constructor() {
        const repository = new CareUnitRepository();
        super(repository);
    }
}

export { CareUnitService };
export default CareUnitService;