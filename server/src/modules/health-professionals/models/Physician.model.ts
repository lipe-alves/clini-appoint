import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPhysician extends IHealthProfessional {
    type: HealthProfessionalType.Physician;
}

class PhysicianModel extends HealthProfessionalModel<IPhysician> implements IPhysician {
    public constructor(data: IPhysician) {
        data.type = "Physician" as HealthProfessionalType.Physician;
        super(data);
    }

    public get type() {
        return "Physician" as HealthProfessionalType.Physician;
    }
}

export { PhysicianModel, IPhysician };
export default PhysicianModel;