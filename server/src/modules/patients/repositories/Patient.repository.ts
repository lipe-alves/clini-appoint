import { Repository } from "@root/core/index";
import PatientModel, { IPatient } from "@root/modules/patients/models/Patient.model";

class PatientRepository extends Repository<IPatient, PatientModel> {
    public constructor() {
        super("patients", PatientModel);
    }
}

export default PatientRepository;
export { PatientRepository };