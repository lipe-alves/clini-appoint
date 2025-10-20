import { Model, IModel } from "@root/core/index";
import { FollowUpPolicyAppliesTo } from "@root/modules/care-units/types/index";

interface ICareUnit extends IModel {
    name: string;
    clinicId: string;
    description?: string;
    specialties: string[];
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
    followUpPolicy: {
        enabled: boolean;
        delayDays: number;
        isFree: boolean;
        appliesTo: FollowUpPolicyAppliesTo;
        exams?: string[];
    };
    examsOffered: string[];
    rooms: string[];
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

    public get specialties() {
        return this.data.specialties;
    }

    public get professionals() {
        return this.data.professionals;
    }

    public get address() {
        return this.data.address;
    }

    public get operatingHours() {
        return this.data.operatingHours;
    }

    public get examsOffered() {
        return this.data.examsOffered;
    }

    public get rooms() {
        return this.data.rooms;
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