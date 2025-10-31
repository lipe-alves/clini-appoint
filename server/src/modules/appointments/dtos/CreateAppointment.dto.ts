import Schema, { SchemaConfig } from "@root/core/Schema"
import { IAppointment, appointmentSchema } from "@root/modules/appointments/models/Appointment.model";
import { ID, Int } from "@root/shared/types";

type CreateAppointmentDto = Pick<IAppointment, 
    | "name"
    | "description" 
    | "observation"
    | "start" 
    | "metadata"
> & {
    careUnitId: ID;
    roomId: ID;
    patientId: ID;
    healthProfessionalId: ID;
    examIds: ID[];
    amount?: Int;
};

const createAppointmentDtoSchema: SchemaConfig = {
    name: { ...appointmentSchema.name, required: false },
    description: { ...appointmentSchema.description, required: false },
    professionalType: { ...appointmentSchema.professionalType, required: false }
};

function validateCreateAppointmentDto(data: any): data is CreateAppointmentDto {
    Schema.validate(data, createAppointmentDtoSchema);
    return true;
}

export { CreateAppointmentDto, createAppointmentDtoSchema, validateCreateAppointmentDto };
export default CreateAppointmentDto;