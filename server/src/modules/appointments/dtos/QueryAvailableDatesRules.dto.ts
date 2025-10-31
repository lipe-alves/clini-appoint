import Schema, { SchemaConfig } from "@root/core/Schema"
import { IAppointment, appointmentSchema } from "@root/modules/appointments/models/Appointment.model";
import { ID, Int } from "@root/shared/types";

interface QueryAvailableDatesRulesDto  {
    roomId?: ID;
}

const queryAvailableDatesRulesDtoSchema: SchemaConfig = {
    
};

function validateQueryAvailableDatesRulesDto(data: any): data is QueryAvailableDatesRulesDto {
    Schema.validate(data, queryAvailableDatesRulesDtoSchema);
    return true;
}

export { QueryAvailableDatesRulesDto, queryAvailableDatesRulesDtoSchema, validateQueryAvailableDatesRulesDto };
export default QueryAvailableDatesRulesDto;