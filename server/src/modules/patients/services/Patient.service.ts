import { Service } from "@root/core";
import PatientModel, { IPatient } from "@root/modules/patients/models/Patient.model";
import PatientRepository from "@root/modules/patients/repositories/Patient.repository";

class PatientService extends Service<IPatient, PatientModel, PatientRepository> {
    public constructor() {
        const repository = new PatientRepository();
        super(repository);
    }
}

export { PatientService };
export default PatientService;