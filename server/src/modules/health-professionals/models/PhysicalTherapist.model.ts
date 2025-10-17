import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPhysicalTherapist extends IHealthProfessional {
    type: HealthProfessionalType.PhysicalTherapist;
}

class PhysicalTherapistModel extends HealthProfessionalModel<IPhysicalTherapist> implements IPhysicalTherapist {
    public constructor(data: IPhysicalTherapist) {
        data.type = "PhysicalTherapist" as HealthProfessionalType.PhysicalTherapist;
        super(data);
    }

    public get type() {
        return "PhysicalTherapist" as HealthProfessionalType.PhysicalTherapist;
    }
}

export { PhysicalTherapistModel, IPhysicalTherapist };
export default PhysicalTherapistModel;