import { Model, IModel, Schema, SchemaConfig } from "@root/core/index";
import { FollowUpPolicy } from "@root/modules/care-units/types/index";
import followUpPolicySchema from "@root/modules/care-units/schemas/followUpPolicy.schema";

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

const roomSchema: SchemaConfig = {
    name: Schema.stringField(true),
    description: Schema.stringField(false),
    careUnitId: Schema.idField(true),
    specialties: Schema.arrayField(true, Schema.idField(true)),
    professionals: Schema.arrayField(true, Schema.idField(true)),
    operatingHours: Schema.arrayField(false, Schema.objectField(true, {
        weekday: Schema.stringField(true),
        openTime: Schema.stringField(true),
        closeTime: Schema.stringField(true)
    })),
    followUpPolicy: { ...followUpPolicySchema },
    examsOffered: Schema.arrayField(true, Schema.stringField(true))
};


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
}

export { RoomModel, IRoom, roomSchema };
export default RoomModel;