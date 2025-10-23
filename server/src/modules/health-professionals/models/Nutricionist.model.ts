import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";
import { HEALTH_PROFESSIONALS_TYPES } from "@root/modules/health-professionals/constants/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface INutritionist extends IHealthProfessional {
    type: HealthProfessionalType.Nutritionist;
}

const nutricionistSchema: SchemaConfig = {
    type: Schema.enumField([HEALTH_PROFESSIONALS_TYPES.NUTRITIONIST], true)
};

class NutritionistModel extends HealthProfessionalModel<INutritionist> implements INutritionist {
    public constructor(data: INutritionist) {
        super(data, nutricionistSchema);
    }

    protected parse(data: any): INutritionist {
        data = super.parse(data);
        data.type = HEALTH_PROFESSIONALS_TYPES.NUTRITIONIST;
        return data;
    }

    public get type() {
        return HEALTH_PROFESSIONALS_TYPES.NUTRITIONIST as HealthProfessionalType.Nutritionist;
    }
}

export { NutritionistModel, INutritionist };
export default NutritionistModel;