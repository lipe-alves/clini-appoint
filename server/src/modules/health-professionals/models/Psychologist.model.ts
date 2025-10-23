import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";
import { HEALTH_PROFESSIONALS_TYPES } from "@root/modules/health-professionals/constants/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IPsychologist extends IHealthProfessional {
    type: HealthProfessionalType.Psychologist;
}

const psychologistSchema: SchemaConfig = {
    type: Schema.enumField([HEALTH_PROFESSIONALS_TYPES.PSYCHOLOGIST], true)
};

class PsychologistModel extends HealthProfessionalModel<IPsychologist> implements IPsychologist {
    public constructor(data: IPsychologist) {
        super(data, psychologistSchema);
    }
    
    protected parse(data: any): IPsychologist {
        data = super.parse(data);
        data.type = HEALTH_PROFESSIONALS_TYPES.PSYCHOLOGIST;
        return data;
    }

    public get type() {
        return HEALTH_PROFESSIONALS_TYPES.PSYCHOLOGIST as HealthProfessionalType.Psychologist;
    }
}

export { PsychologistModel, IPsychologist };
export default PsychologistModel;