import HealthProfessionalModel, { IHealthProfessional } from "./HealthProfessional.model";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface INutritionist extends IHealthProfessional {
    type: HealthProfessionalType.Nutritionist;
}

class NutritionistModel extends HealthProfessionalModel<INutritionist> implements INutritionist {
    public get type() {
        return "Nutritionist" as HealthProfessionalType.Nutritionist;
    }

    protected parse(data: any): INutritionist {
        data = super.parse(data);
        data.type = "Nutritionist";
        return data;
    }
}

export { NutritionistModel, INutritionist };
export default NutritionistModel;