import { Model, IModel } from "@root/core/index";
import { FollowUpPolicy } from "@root/modules/care-units/types/index";

interface IRoom extends IModel {
    name: string;
    description?: string;
    careUnitId: string;
    specialties: string[];
    professionals: string[];
    operatingHours?: {
        weekday: string;
        openTime: string;
        closeTime: string;
    }[];
    followUpPolicy: FollowUpPolicy;
    examsOffered: string[];
}

class RoomModel extends Model<IRoom> implements IRoom {
    public get name() {
        return this.data.name;
    }

    public get description() {
        return this.data.description;
    }

    public get careUnitId() {
        return this.data.careUnitId;
    }

    public get specialties() {
        return this.data.specialties;
    }

    public get professionals() {
        return this.data.professionals;
    }

    public get operatingHours() {
        return this.data.operatingHours;
    }

    public get examsOffered() {
        return this.data.examsOffered;
    }

    public get followUpPolicy() {
        return this.data.followUpPolicy;
    }

    public validate(): boolean {
        return true;
    }
}

export { RoomModel, IRoom };
export default RoomModel;