import { ServerError } from "@root/core/index";
import ExamModel from "@root/modules/exams/models/Exam.model";
import PatientModel from "@root/modules/patients/models/Patient.model";

class GenderRestrictionError extends ServerError {
    public constructor(patient: PatientModel, exam: ExamModel) {
        let message = `Exam ${exam.name} (ID ${exam.id}) accepts only the following genders: ${exam.genders?.join(", ") || "All"} but `;
        
        if (!patient.gender) {
            message += "patient's gender is not defined."
        } else {
            message += `patient's gender is ${patient.gender}`;
        }

        super(400, message, "ERR_GENDER_RESTRICTION");
    }
}

export { GenderRestrictionError };
export default GenderRestrictionError;