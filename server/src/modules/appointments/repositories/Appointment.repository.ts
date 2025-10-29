import { Repository } from "@root/core/index";
import AppointmentModel, { IAppointment } from "@root/modules/appointments/models/Appointment.model";

class AppointmentRepository extends Repository<IAppointment, AppointmentModel> {
    public constructor() {
        super("appointments", AppointmentModel);
    }
}

export default AppointmentRepository;
export { AppointmentRepository };