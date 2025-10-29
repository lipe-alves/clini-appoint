import Schema, { SchemaConfig } from "@root/core/Schema"
import { IAppointment, appointmentSchema } from "@root/modules/appointments/models/Appointment.model";
import CreateModelDto, { validateCreateModelDto } from "@root/shared/dtos/CreateModel.dto";

type CreateAppointmentDto = Pick<IAppointment, "name" | "description" | "professionalType"> & CreateModelDto<IAppointment>;

const createAppointmentDtoSchema: SchemaConfig = {
    name: { ...appointmentSchema.name, required: false },
    description: { ...appointmentSchema.description, required: false },
    professionalType: { ...appointmentSchema.professionalType, required: false }
};

function validateCreateAppointmentDto(data: any): data is CreateAppointmentDto {
    validateCreateModelDto(data);
    Schema.validate(data, createAppointmentDtoSchema);
    return true;
}

export { CreateAppointmentDto, createAppointmentDtoSchema, validateCreateAppointmentDto };
export default CreateAppointmentDto;