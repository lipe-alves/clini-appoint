import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPsychologist extends IHealthProfessional {
    type: HealthProfessionalType.Psychologist;
}

class PsychologistModel extends HealthProfessionalModel<IPsychologist> implements IPsychologist {
    public get type() {
        return "Psychologist" as HealthProfessionalType.Psychologist;
    }

    protected parse(data: any): IPsychologist {
        data = super.parse(data);
        data.type = "Psychologist";
        return data;
    }
}

export { PsychologistModel, IPsychologist };
export default PsychologistModel;