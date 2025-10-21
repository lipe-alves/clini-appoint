import { Model, IModel } from "@root/core/index";
import { FollowUpPolicy } from "@root/modules/care-units/types/index";

interface ICareUnit extends IModel {
    name: string;
    clinicId: string;
    description?: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    followUpPolicy: FollowUpPolicy;
}

class CareUnitModel extends Model<ICareUnit> implements ICareUnit {
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get clinicId() {
        return this.data.clinicId;
    }

    public get address() {
        return this.data.address;
    }

    public get followUpPolicy() {
        return this.data.followUpPolicy;
    }

    public validate(): boolean {
        return true;
    }
}

export { CareUnitModel, ICareUnit };
export default CareUnitModel;