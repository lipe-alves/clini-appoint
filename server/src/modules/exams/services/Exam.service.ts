import { Service } from "@root/core";
import ExamModel, { IExam } from "@root/modules/exams/models/Exam.model";
import ExamRepository from "@root/modules/exams/repositories/Exam.repository";

class ExamService extends Service<IExam, ExamModel, ExamRepository> {
    public constructor() {
        const repository = new ExamRepository();
        super(repository);
    }
}

export { ExamService };
export default ExamService;