import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface INutritionist extends IHealthProfessional {
    type: HealthProfessionalType.Nutritionist;
}

class NutritionistModel extends HealthProfessionalModel<INutritionist> implements INutritionist {
    public constructor(data: INutritionist) {
        data.type = "Nutritionist" as HealthProfessionalType.Nutritionist;
        super(data);
    }

    public get type() {
        return "Nutritionist" as HealthProfessionalType.Nutritionist;
    }
}

export { NutritionistModel, INutritionist };
export default NutritionistModel;