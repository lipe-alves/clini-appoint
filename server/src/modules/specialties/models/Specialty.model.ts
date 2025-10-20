import { Model, IModel } from "@root/core/index";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface ISpecialty extends IModel {
    name: string;
    description?: string;
    professionalType: HealthProfessionalType;
}

class SpecialtyModel<T extends ISpecialty = ISpecialty> extends Model<T> implements ISpecialty {
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get professionalType() {
        return this.data.professionalType;
    }

    public validate(): boolean {
        return true;
    }
}

export { SpecialtyModel, ISpecialty };
export default SpecialtyModel;