import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";
import { HEALTH_PROFESSIONALS_TYPES } from "@root/modules/health-professionals/constants/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IPhysicalTherapist extends IHealthProfessional {
    type: HealthProfessionalType.PhysicalTherapist;
}

const physicalTherapistSchema: SchemaConfig = {
    type: Schema.enumField([HEALTH_PROFESSIONALS_TYPES.PHYSICAL_THERAPIST], true)
};

class PhysicalTherapistModel extends HealthProfessionalModel<IPhysicalTherapist> implements IPhysicalTherapist {
    public constructor(data: IPhysicalTherapist) {
        super(data, physicalTherapistSchema);
    }
    
    protected parse(data: any): IPhysicalTherapist {
        data = super.parse(data);
        data.type = HEALTH_PROFESSIONALS_TYPES.PHYSICAL_THERAPIST;
        return data;
    }

    public get type() {
        return HEALTH_PROFESSIONALS_TYPES.PHYSICAL_THERAPIST as HealthProfessionalType.PhysicalTherapist;
    }
}

export { PhysicalTherapistModel, IPhysicalTherapist };
export default PhysicalTherapistModel;