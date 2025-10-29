import { Model, IModel, Schema, SchemaConfig } from "@root/core/index";
import { FollowUpPolicy } from "@root/modules/care-units/types/index";
import { FOLLOW_UP_POLICY_APPLIES_TO } from "@root/modules/care-units/constants";

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
    operatingHours?: {
        weekday: string;
        openTime: string;
        closeTime: string;
    }[];
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
    operatingHours: Schema.arrayField(false, Schema.objectField(true, {
        weekday: Schema.stringField(true),
        openTime: Schema.stringField(true),
        closeTime: Schema.stringField(true)
    })),
    followUpPolicy: Schema.objectField(true, {
        enabled: Schema.booleanField(true),
        delayDays: Schema.intField(true),
        isFree: Schema.booleanField(true),
        appliesTo: Schema.enumField([...FOLLOW_UP_POLICY_APPLIES_TO], true),
        exams: Schema.arrayField(false, Schema.stringField(true))
    }),
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

    public validate(): boolean {
        return true;
    }
}

export { CareUnitModel, ICareUnit, careUnitSchema };
export default CareUnitModel;