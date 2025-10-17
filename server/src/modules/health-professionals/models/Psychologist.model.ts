import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface IPsychologist extends IHealthProfessional {
    type: HealthProfessionalType.Psychologist;
}

class PsychologistModel extends HealthProfessionalModel<IPsychologist> implements IPsychologist {
    public constructor(data: IPsychologist) {
        data.type = "Psychologist" as HealthProfessionalType.Psychologist;
        super(data);
    }

    public get type() {
        return "Psychologist" as HealthProfessionalType.Psychologist;
    }
}

export { PsychologistModel, IPsychologist };
export default PsychologistModel;