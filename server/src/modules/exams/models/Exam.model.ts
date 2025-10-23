import { Model, IModel } from "@root/core/index";
import { ExamType, DurationType, FollowUpPolicy } from "@root/modules/exams/types/index";
import { 
    EXAM_TYPES_LIST,
    DURATION_TYPES_LIST
} from "@root/modules/exams/constants/index";
import { GENDER_LIST } from "@root/shared/constants/index";
import { Gender, Int } from "@root/shared/types/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

interface IExam extends IModel {
    name: string;
    type: ExamType;
    customType?: string;
    description?: string;
    duration?: {
        type: DurationType;
        value: number;
    };
    resultsTime?: {
        type: DurationType;
        value: number;
    };
    preparation: {
        instructions: string;
        requiresFasting: boolean;
    };
    followUpPolicy: FollowUpPolicy;
    minAge?: number;
    maxAge?: number;
    genderRestriction?: Gender;
    specialties?: string[];
    amount: Int;
}

const examSchema: SchemaConfig = {
    name: Schema.stringField(true),
    type: Schema.enumField([...EXAM_TYPES_LIST], true),
    customType: Schema.stringField(false),
    description: Schema.stringField(false),
    duration: Schema.objectField(false, {
        type: Schema.enumField([...DURATION_TYPES_LIST], true),
        value: Schema.intField(true),
    }),
    resultsTime: Schema.objectField(false, {
        type: Schema.enumField([...DURATION_TYPES_LIST], true),
        value: Schema.intField(true),
    }),
    preparation: Schema.objectField(true, {
        instructions: Schema.stringField(true),
        requiresFasting: Schema.booleanField(true),
    }),
    followUpPolicy: Schema.objectField(true, {
        enabled: Schema.booleanField(true),
        delayDays: Schema.intField(true),
        isFree: Schema.booleanField(true)
    }),
    minAge: Schema.intField(false),
    maxAge: Schema.intField(false),
    genderRestriction: Schema.enumField([...GENDER_LIST], false),
    specialties: Schema.arrayField(false, Schema.stringField(true)),
    amount: Schema.intField(true),
};

class ExamModel extends Model<IExam> implements IExam {
    public constructor(data: IExam) {
        super(data, examSchema);
    }

    public get name() {
        return this.data.name;
    }

    public get type() {
        return this.data.type;
    }

    public get customType() {
        return this.data.customType;
    }

    public get description() {
        return this.data.description;
    }

    public get resultsTime() {
        return this.data.resultsTime;
    }

    public get preparation() {
        return this.data.preparation;
    }

    public get followUpPolicy() {
        return this.data.followUpPolicy;
    }

    public get minAge() {
        return this.data.minAge;
    }

    public get maxAge() {
        return this.data.maxAge;
    }

    public get genderRestriction() {
        return this.data.genderRestriction;
    }

    public get specialties() {
        return this.data.specialties;
    }

    public get amount() {
        return this.data.amount;
    }
}

export { ExamModel, IExam };
export default ExamModel;