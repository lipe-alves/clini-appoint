import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";
import { HEALTH_PROFESSIONALS_TYPES } from "@root/modules/health-professionals/constants/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IPhysician extends IHealthProfessional {
    type: HealthProfessionalType.Physician;
}

const physicianSchema: SchemaConfig = {
    type: Schema.enumField([HEALTH_PROFESSIONALS_TYPES.PHYSICIAN], true)
};

class PhysicianModel extends HealthProfessionalModel<IPhysician> implements IPhysician {
    public constructor(data: IPhysician) {
        super(data, physicianSchema);
    }
    
    protected parse(data: any): IPhysician {
        data = super.parse(data);
        data.type = HEALTH_PROFESSIONALS_TYPES.PHYSICIAN;
        return data;
    }

    public get type() {
        return HEALTH_PROFESSIONALS_TYPES.PHYSICIAN as HealthProfessionalType.Physician;
    }

}

export { PhysicianModel, IPhysician };
export default PhysicianModel;