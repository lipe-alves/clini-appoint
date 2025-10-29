import { ICareUnit } from "@root/modules/care-units/models/CareUnit.model";
import { IRoom } from "@root/modules/care-units/models/Room.model";
import { IExam } from "@root/modules/exams/models/Exam.model";
import { IHealthProfessional } from "@root/modules/health-professionals/models/HealthProfessional.model";
import { IPatient } from "@root/modules/patients/models/Patient.model";
import { 
    APPOINTMENT_STATUS_LIST, 
    PAYMENT_METHOD_LIST, 
    PAYMENT_STATUS_LIST, 
    PAYMENT_TYPE_LIST 
} from "@root/modules/appointments/constants";

export type AppointmentStatus = typeof APPOINTMENT_STATUS_LIST[number];
export type PaymentType = typeof PAYMENT_TYPE_LIST[number];
export type PaymentMethod = typeof PAYMENT_METHOD_LIST[number];
export type PaymentStatus = typeof PAYMENT_STATUS_LIST[number];
export type CareUnitSummary = Pick<ICareUnit, 
    | "id"
    | "clinicId"
    | "name"
    | "description"
>;
export type RoomSummary = Pick<IRoom, 
    | "id"
    | "careUnitId"
    | "name"
    | "description"
    | "followUpPolicy"
    | "operatingHours"
>;
export type PatientSummary = Pick<IPatient, 
    | "id"
    | "firstName"
    | "lastName"
    | "document"
>;
export type HealthProfessionalSummary = Pick<IHealthProfessional, 
    | "id"
    | "type"
    | "customType"
    | "firstName"
    | "lastName"
    | "registration"
>;
export type ExamSummary = Pick<IExam, 
    | "id"
    | "name"
    | "followUpPolicy"
    | "duration"
    | "resultsTime"
    | "description"
    | "preparation"
>;