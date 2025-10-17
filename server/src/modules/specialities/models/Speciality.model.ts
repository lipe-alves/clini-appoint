import { Model, IModel } from "@root/core/index";
import { HealthProfessionalType } from "@root/modules/health-professionals/types/index";

interface ISpeciality extends IModel {
    name: string;
    description?: string;
    professionalType: HealthProfessionalType;
}

class SpecialityModel<T extends ISpeciality = ISpeciality> extends Model<T> implements ISpeciality {
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

export { SpecialityModel, ISpeciality };
export default SpecialityModel;