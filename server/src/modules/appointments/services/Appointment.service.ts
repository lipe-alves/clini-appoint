import { Service } from "@root/core";
import AppointmentModel, { IAppointment } from "@root/modules/appointments/models/Appointment.model";
import AppointmentRepository from "@root/modules/appointments/repositories/Appointment.repository";

class AppointmentService extends Service<IAppointment, AppointmentModel, AppointmentRepository> {
    public constructor() {
        const appointmentRepository = new AppointmentRepository();
        super(appointmentRepository);
    }

    public async create(data: Cr) {

    }
}

export default AppointmentService;
export { AppointmentService };