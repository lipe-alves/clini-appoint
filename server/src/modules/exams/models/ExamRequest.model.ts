import { Model, IModel } from "@root/core/index";
import { ID } from "@root/shared/types/index";
import { FollowUpPolicy, PriorityLevel } from "@root/modules/exams/types/index";
import { toDate } from "@root/shared/utils/index";

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

class ExamRequestModel extends Model<IExamRequest> implements IExamRequest {
    public get appointmentId() {
        return this.data.appointmentId;
    }

    public get requestedAt() {
        return this.data.requestedAt;
    }

    public get exams() {
        return this.data.exams;
    }

    protected parse(data: any): IExamRequest {
        data = super.parse(data);
        data.requestedAt = toDate(data.requestedAt);
        return data;
    }

    public validate(): boolean {
        return true;
    }
}

export { ExamRequestModel, IExamRequest };
export default ExamRequestModel;