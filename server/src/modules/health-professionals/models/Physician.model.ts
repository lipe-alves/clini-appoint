import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPhysician extends IHealthProfessional {
    type: HealthProfessionalType.Physician;
}

class PhysicianModel extends HealthProfessionalModel<IPhysician> implements IPhysician {
    public get type() {
        return "Physician" as HealthProfessionalType.Physician;
    }

    protected parse(data: any): IPhysician {
        data = super.parse(data);
        data.type = "Physician";
        return data;
    }    
}

export { PhysicianModel, IPhysician };
export default PhysicianModel;