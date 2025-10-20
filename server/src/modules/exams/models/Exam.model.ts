import { Model, IModel } from "@root/core/index";
import { ExamType, DurationType, FollowUpPolicy } from "@root/modules/exams/types/index";
import { Gender } from "@root/shared/types";

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
}

class ExamModel extends Model<IExam> implements IExam {
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

    public validate(): boolean {
        return true;
    }
}

export { ExamModel, IExam };
export default ExamModel;