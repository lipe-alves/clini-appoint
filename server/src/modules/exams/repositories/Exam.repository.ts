import { Repository } from "@root/core/index";
import ExamModel, { IExam } from "@root/modules/exams/models/Exam.model";

class ExamRepository extends Repository<IExam, ExamModel> {
    public constructor() {
        super("exams", ExamModel);
    }

    public async getByName(database: string, name: string): Promise<ExamModel | null> {
        const [specialty = null] = await this
            .where("database", "==", database)
            .and("name", "==", name)
            .list();
        return specialty;
    }
}

export default ExamRepository;
export { ExamRepository };