import { ServerError } from "@root/core/index";
import HealthProfessionalModel from "@root/modules/health-professionals/models/HealthProfessional.model";

class SpecialtyRestrictionError extends ServerError {
    public constructor(professional: HealthProfessionalModel, specialties: string[]) {
        const message = `Health professional "${professional.fullName}" (ID ${professional.id}) does not have the required specialties: ${specialties.join(", ")}.`;
        super(400, message, "ERR_SPECIALTY_RESTRICTION");
    }
}

export { SpecialtyRestrictionError };
export default SpecialtyRestrictionError;