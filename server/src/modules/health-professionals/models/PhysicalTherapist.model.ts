import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPhysicalTherapist extends IHealthProfessional {
    type: HealthProfessionalType.PhysicalTherapist;
}

class PhysicalTherapistModel extends HealthProfessionalModel<IPhysicalTherapist> implements IPhysicalTherapist {
    public get type() {
        return "PhysicalTherapist" as HealthProfessionalType.PhysicalTherapist;
    }

    protected parse(data: any): IPhysicalTherapist {
        data = super.parse(data);
        data.type = "PhysicalTherapist";
        return data;
    }
}

export { PhysicalTherapistModel, IPhysicalTherapist };
export default PhysicalTherapistModel;