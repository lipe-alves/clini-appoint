import { Model, IModel } from "@root/core/index";

import { ID } from "@root/shared/types/index";
import { toDate } from "@root/shared/utils/index";
import Schema, { SchemaConfig } from "@root/core/Schema";

import { FollowUpPolicy, PriorityLevel } from "@root/modules/exams/types/index";
import { PRIORITY_LEVELS_LIST } from "@root/modules/exams/constants/index";

interface IExamRequest extends IModel {
    appointmentId: ID;
    requestedAt: Date;
    exams: {
        examId: ID;
        priority?: PriorityLevel;
        followUpPolicy?: FollowUpPolicy;
        notes?: string;
    }[];
}

const examRequestSchema: SchemaConfig = {
    appointmentId: Schema.idField(true),
    requestedAt: Schema.dateField(true),
    exams: Schema.arrayField(true, Schema.objectField(true, {
        examId: Schema.idField(true),
        priority: Schema.enumField([...PRIORITY_LEVELS_LIST], false),
        followUpPolicy: Schema.objectField(false, {
            enabled: Schema.booleanField(true),
            delayDays: Schema.intField(true),
            isFree: Schema.booleanField(true)
        }),
        notes: Schema.stringField(false)
    }))
};

class ExamRequestModel extends Model<IExamRequest> implements IExamRequest {
    public constructor(data: IExamRequest) {
        super(data, examRequestSchema);
    }

    protected parse(data: any): IExamRequest {
        data = super.parse(data);
        data.requestedAt = toDate(data.requestedAt);
        return data;
    }

    public get appointmentId() {
        return this.data.appointmentId;
    }

    public get requestedAt() {
        return this.data.requestedAt;
    }

    public get exams() {
        return this.data.exams;
    }
}

export { ExamRequestModel, IExamRequest };
export default ExamRequestModel;