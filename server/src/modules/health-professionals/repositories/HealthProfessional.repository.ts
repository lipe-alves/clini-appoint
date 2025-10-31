import { Repository } from "@root/core/index";
import HealthProfessionalModel, { IHealthProfessional } from "@root/modules/health-professionals/models/HealthProfessional.model";

class HealthProfessionalRepository extends Repository<IHealthProfessional, HealthProfessionalModel> {
    public constructor() {
        super("health-professionals", HealthProfessionalModel);
    }
}

export default HealthProfessionalRepository;
export { HealthProfessionalRepository };