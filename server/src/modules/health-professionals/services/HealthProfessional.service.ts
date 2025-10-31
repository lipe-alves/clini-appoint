import { Service } from "@root/core";
import HealthProfessionalModel, { IHealthProfessional } from "@root/modules/health-professionals/models/HealthProfessional.model";
import HealthProfessionalRepository from "@root/modules/health-professionals/repositories/HealthProfessional.repository";

class HealthProfessionalService extends Service<IHealthProfessional, HealthProfessionalModel, HealthProfessionalRepository> {
    public constructor() {
        const repository = new HealthProfessionalRepository();
        super(repository);
    }
}

export { HealthProfessionalService };
export default HealthProfessionalService;