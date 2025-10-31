import { ServerError } from "@root/core/index";
import ExamModel from "@root/modules/exams/models/Exam.model";
import PatientModel from "@root/modules/patients/models/Patient.model";

class AgeRestrictionError extends ServerError {
    public constructor(patient: PatientModel, exam: ExamModel) {
        let message = `Exam ${exam.name} (ID ${exam.id}) accepts only patients whose ages `;

        if (exam.minAge && exam.maxAge) {
            message += `are between ${exam.minAge} and ${exam.maxAge}, `;
        } else if (exam.minAge) {
            message += `are greater than ${exam.minAge}, `;
        } else {
            message += `are lesser than ${exam.maxAge}, `;
        }
        
        if (!patient.age) {
            message += "patient's age is not defined."
        } else {
            message += `patient's age is ${patient.age}`;
        }

        super(400, message, "ERR_AGE_RESTRICTION");
    }
}

export { AgeRestrictionError };
export default AgeRestrictionError;