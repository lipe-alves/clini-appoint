import { Model, IModel, Schema, SchemaConfig } from "@root/core/index";
import { FollowUpPolicy } from "@root/modules/care-units/types/index";
import followUpPolicySchema from "@root/modules/care-units/schemas/followUpPolicy.schema";

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

const careUnitSchema: SchemaConfig = {
    name: Schema.stringField(true),
    clinicId: Schema.idField(true),
    description: Schema.stringField(false),
    address: Schema.objectField(true, {
        street: Schema.stringField(true),
        city: Schema.stringField(true),
        state: Schema.stringField(true),
        postalCode: Schema.stringField(true),
        country: Schema.stringField(true)
    }),
    followUpPolicy: { ...followUpPolicySchema },
};

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
}

export { CareUnitModel, ICareUnit, careUnitSchema };
export default CareUnitModel;