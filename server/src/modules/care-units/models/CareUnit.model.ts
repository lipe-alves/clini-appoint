import { Model, IModel } from "@root/core/index";

interface ICareUnit extends IModel {
    name: string;
    clinicId: string;
    description?: string;
    specialities: string[];
    professionals: string[];
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    operatingHours: {
        weekday: string;
        openTime: string;
        closeTime: string;
    }[];
    examsOffered: string[];
}

class CareUnitModel extends Model<ICareUnit> implements ICareUnit {
    public get name() {
        return this.data.name;
    }

    public get address() {
        return this.data.address;
    }

    public get clinicId() {
        return this.data.clinicId;
    }

    public get description() {
        return this.data.description;
    }

    public validate(): boolean {
        return true;
    }
}

export { CareUnitModel, ICareUnit };
export default CareUnitModel;